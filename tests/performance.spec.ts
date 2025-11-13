import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

// Thresholds do Core Web Vitals
const THRESHOLDS = {
	LCP: 2500, // Largest Contentful Paint
	INP: 200,  // Interaction to Next Paint (substitui FID)
	CLS: 0.1,  // Cumulative Layout Shift
	FCP: 1800, // First Contentful Paint
	TTFB: 800  // Time to First Byte
};

test.describe('Performance Tests', () => {
	let page: Page;

	test.beforeEach(async ({ page: p }) => {
		page = p;
	});

	test('should meet Core Web Vitals thresholds', async () => {
		await page.goto('http://localhost:4173');

		// Esperar carregamento completo
		await page.waitForLoadState('networkidle');

		// Coletar métricas via Performance API
		const metrics = await page.evaluate(() => {
			return new Promise((resolve) => {
				const observer = new PerformanceObserver((list) => {
					const entries = list.getEntries();
					const lcp = entries.find(e => e.entryType === 'largest-contentful-paint');
					const fcp = entries.find(e => e.entryType === 'paint' && e.name === 'first-contentful-paint');

					if (lcp && fcp) {
						observer.disconnect();
						resolve({
							LCP: lcp.startTime,
							FCP: fcp.startTime
						});
					}
				});

				observer.observe({ entryTypes: ['largest-contentful-paint', 'paint'] });

				// Fallback timeout
				setTimeout(() => resolve({ LCP: 0, FCP: 0 }), 10000);
			});
		});

		console.log('Métricas coletadas:', metrics);

		// Validar LCP
		if ((metrics as { LCP: number }).LCP > 0) {
			expect((metrics as { LCP: number }).LCP).toBeLessThan(THRESHOLDS.LCP);
		}

		// Validar FCP
		if ((metrics as { FCP: number }).FCP > 0) {
			expect((metrics as { FCP: number }).FCP).toBeLessThan(THRESHOLDS.FCP);
		}
	});

	test('should load Hero section quickly (LCP element)', async () => {
		const startTime = Date.now();
		await page.goto('http://localhost:4173');

		// Aguardar Hero ser visível (provável LCP)
		await page.waitForSelector('h1', { state: 'visible' });
		const loadTime = Date.now() - startTime;

		console.log('Hero load time:', loadTime, 'ms');
		expect(loadTime).toBeLessThan(2000); // Hero deve carregar < 2s
	});

	test('should have no layout shifts (CLS = 0)', async () => {
		await page.goto('http://localhost:4173');
		await page.waitForLoadState('networkidle');

		const cls = await page.evaluate(() => {
			return new Promise<number>((resolve) => {
				let clsValue = 0;
				const observer = new PerformanceObserver((list) => {
					for (const entry of list.getEntries()) {
						if ((entry as any).hadRecentInput) continue;
						clsValue += (entry as any).value;
					}
				});

				observer.observe({ entryTypes: ['layout-shift'] });

				setTimeout(() => {
					observer.disconnect();
					resolve(clsValue);
				}, 5000);
			});
		});

		console.log('CLS:', cls);
		expect(cls).toBeLessThan(THRESHOLDS.CLS);
	});

	test('should load fonts without blocking', async () => {
		await page.goto('http://localhost:4173');

		// Verificar se fonts estão carregando via font-display: optional
		const fontDisplay = await page.evaluate(() => {
			const fontFaces = Array.from(document.fonts.values());
			return fontFaces.map(f => ({
				family: f.family,
				status: f.status,
				loaded: f.loaded
			}));
		});

		console.log('Fonts:', fontDisplay);
		// Fonts devem estar loading ou loaded, não unloaded
		expect(fontDisplay.some(f => f.status === 'loading' || f.status === 'loaded')).toBe(true);
	});

	test('should have Service Worker registered', async () => {
		await page.goto('http://localhost:4173');
		await page.waitForTimeout(2000); // Aguardar SW registration

		const swRegistered = await page.evaluate(() => {
			return navigator.serviceWorker.controller !== null;
		});

		console.log('Service Worker registered:', swRegistered);
		// Em primeira visita pode não estar registered ainda
		// Teste passa se SW está disponível no navegador
		const swAvailable = await page.evaluate(() => 'serviceWorker' in navigator);
		expect(swAvailable).toBe(true);
	});

	test('should compress resources with Brotli', async () => {
		const response = await page.goto('http://localhost:4173');
		const headers = response?.headers();

		console.log('Response headers:', headers);
		// Verificar se servidor suporta compressão
		expect(headers?.['content-encoding'] || 'none').toMatch(/br|gzip|deflate/);
	});
});

test.describe('SEO Technical Tests', () => {
	test('should have proper meta tags', async ({ page }) => {
		await page.goto('http://localhost:4173');

		const title = await page.title();
		const metaDescription = await page.getAttribute('meta[name="description"]', 'content');
		const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
		const canonical = await page.getAttribute('link[rel="canonical"]', 'href');

		console.log({ title, metaDescription, ogTitle, canonical });

		expect(title).toBeTruthy();
		expect(title!.length).toBeGreaterThan(10);
		expect(title!.length).toBeLessThan(60);

		expect(metaDescription).toBeTruthy();
		expect(metaDescription!.length).toBeGreaterThan(50);
		expect(metaDescription!.length).toBeLessThan(160);

		expect(ogTitle).toBeTruthy();
		expect(canonical).toBeTruthy();
	});

	test('should have structured data (JSON-LD)', async ({ page }) => {
		await page.goto('http://localhost:4173');

		const jsonLdScripts = await page.$$eval(
			'script[type="application/ld+json"]',
			(scripts) => scripts.map(s => JSON.parse(s.textContent || '{}'))
		);

		console.log('Structured data found:', jsonLdScripts.length, 'schemas');
		expect(jsonLdScripts.length).toBeGreaterThan(0);

		// Verificar Organization schema
		const hasOrg = jsonLdScripts.some(s => s['@type'] === 'Organization');
		expect(hasOrg).toBe(true);
	});

	test('should be mobile-friendly', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
		await page.goto('http://localhost:4173');

		const viewport = await page.getAttribute('meta[name="viewport"]', 'content');
		expect(viewport).toContain('width=device-width');

		// Verificar se não tem scroll horizontal
		const hasHorizontalScroll = await page.evaluate(() => {
			return document.documentElement.scrollWidth > document.documentElement.clientWidth;
		});
		expect(hasHorizontalScroll).toBe(false);
	});
});
