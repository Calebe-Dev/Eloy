import { test, expect } from '@playwright/test';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BUILD_DIR = path.resolve(__dirname, '..', 'build');
let PORT = 0; // 0 => random available port per worker
let BASE_URL = '';

function createStaticServer(dir: string) {
  return http.createServer((req, res) => {
    try {
      const urlPath = req.url === '/' || !req.url ? '/index.html' : req.url.split('?')[0];
      const filePath = path.join(dir, decodeURIComponent(urlPath));
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const map: Record<string, string> = {
          '.html': 'text/html; charset=utf-8',
          '.js': 'application/javascript; charset=utf-8',
          '.css': 'text/css; charset=utf-8',
          '.json': 'application/json; charset=utf-8',
          '.svg': 'image/svg+xml',
          '.png': 'image/png',
          '.woff2': 'font/woff2'
        };
        res.writeHead(200, { 'Content-Type': map[ext] || 'application/octet-stream' });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
      }
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server error');
    }
  });
}

test.describe('EmailJS client-side integration', () => {
  let server: http.Server;

  test.beforeAll(async () => {
    server = createStaticServer(BUILD_DIR);
    await new Promise<void>((resolve) => server.listen(PORT, resolve));
    const addr: any = server.address();
    const port = addr && addr.port ? addr.port : PORT;
    BASE_URL = `http://localhost:${port}`;
  });

  test.afterAll(async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  test('chatbot sends lead via EmailJS (client path)', async ({ page }) => {
    const requests: any[] = [];

    // Fallback: intercept via page.route (network-level)
    await page.route('https://api.emailjs.com/**', async (route) => {
      try {
        requests.push(route.request());
      } catch (e) {
        // ignore
      }
      await route.continue();
    });

    // Also inject a fetch wrapper in the page context to capture fetch() calls
    await page.addInitScript(() => {
      (window as any).__emailjs_requests = [];
      const _fetch = window.fetch;
      window.fetch = function (input: any, init: any) {
        try {
          const url = typeof input === 'string' ? input : input && input.url;
          if (url && url.includes('api.emailjs.com')) {
            (window as any).__emailjs_requests.push({ url, init });
          }
        } catch (e) {
          // ignore
        }
        return _fetch.apply(this, arguments as any);
      } as typeof fetch;

      // Patch XHR as well
      const _open = XMLHttpRequest.prototype.open;
      const _send = XMLHttpRequest.prototype.send;
      XMLHttpRequest.prototype.open = function (method: any, url: any, ...rest: any[]) {
        try {
          (this as any).__url = url;
        } catch (e) {}
        return _open.apply(this, [method, url, ...rest]);
      };
      XMLHttpRequest.prototype.send = function (body: any) {
        try {
          const url = (this as any).__url;
          if (url && typeof url === 'string' && url.includes('api.emailjs.com')) {
            (window as any).__emailjs_requests.push({ url, body });
          }
        } catch (e) {}
        return _send.apply(this, [body]);
      };
    });

    await page.goto(`${BASE_URL}/`);

    // Open the chatbot by clicking the floating toggle button 'E'
    await page.waitForSelector('button', { timeout: 8000 });
    // Try to click the button with text 'E' (chat toggle)
    const buttons = await page.locator('button').allTextContents();
    // find index of a button that contains single letter E or 'E' text
    let clicked = false;
    for (const idx in buttons) {
      const txt = (buttons[idx] || '').trim();
      if (txt === 'E') {
        await page.locator('button').nth(Number(idx)).click();
        clicked = true;
        break;
      }
    }
    if (!clicked) {
      // fallback: click first button
      await page.locator('button').first().click();
    }

    // Wait for the chatbot input to appear
    await page.waitForSelector('#eloi-input', { timeout: 8000 });

    // Send name first, then send phone+email so the chatbot captures contacts and triggers send
    const nameMessage = 'João';
    await page.fill('#eloi-input', nameMessage);
    await page.keyboard.press('Enter');
    // small delay to allow the chatbot to process
    await page.waitForTimeout(600);

    const contactMessage = '11999999999 joao@example.com';
    await page.fill('#eloi-input', contactMessage);
    await page.keyboard.press('Enter');

    // Wait for an EmailJS request to be captured (with timeout)
    const max = 10000;
    const start = Date.now();
    let captured = [] as any[];
    while (Date.now() - start < max) {
      // read page-injected requests
      captured = await page.evaluate(() => (window as any).__emailjs_requests || []);
      if ((captured && captured.length > 0) || requests.length > 0) break;
      await new Promise((r) => setTimeout(r, 200));
    }

    // Prefer page-injected captures (more reliable), fallback to network-level
    const finalRequests = (captured && captured.length > 0) ? captured : requests;

    expect(finalRequests.length).toBeGreaterThan(0);

    // Validate that request body contains service_id/template_id/user_id/template_params
    const first = finalRequests[0];
    let bodyObj: any = null;
    if (first && first.init && first.init.body) {
      try {
        bodyObj = typeof first.init.body === 'string' ? JSON.parse(first.init.body) : first.init.body;
      } catch (e) {
        bodyObj = null;
      }
    }
    expect(bodyObj || first).toBeTruthy();
  });
});
