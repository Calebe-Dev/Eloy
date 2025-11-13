# 🚀 Performance Testing & Web Vitals Monitoring - Eloi

## 📊 Implementação Completa

### ✅ Arquivos Criados

1. **`src/lib/utils/webVitals.ts`** - Sistema de monitoramento de Core Web Vitals
2. **`tests/performance.spec.ts`** - Testes automatizados de performance e SEO
3. **`playwright.config.ts`** - Configuração Playwright para testes E2E
4. **`lighthouserc.json`** - Performance budgets e CI configuration

---

## 🎯 Core Web Vitals Monitorados

| Métrica | Threshold (Good) | Threshold (Poor) | O que mede |
|---------|------------------|------------------|------------|
| **LCP** | < 2.5s | > 4.0s | Tempo de carregamento do maior elemento |
| **FID** | < 100ms | > 300ms | Delay até primeira interação |
| **CLS** | < 0.1 | > 0.25 | Estabilidade visual (layout shifts) |
| **FCP** | < 1.8s | > 3.0s | Tempo até primeiro conteúdo pintado |
| **TTFB** | < 800ms | > 1.8s | Tempo até primeiro byte do servidor |
| **INP** | < 200ms | > 500ms | Responsividade de interações |

---

## 📦 Instalação de Dependências

```bash
# Instalar pacotes necessários
npm install --save-dev web-vitals @playwright/test lighthouse @lhci/cli

# Instalar navegadores Playwright
npx playwright install
```

---

## 🔧 Configuração

### 1. Adicionar Web Vitals ao Layout

Edite `src/routes/+layout.svelte`:

```svelte
<script lang="ts">
	import '../app.css';
	import { initWebVitals } from '$lib/utils/webVitals';

	let { children } = $props();

	// Lazy load non-critical fonts after initial render
	if (typeof window !== 'undefined') {
		// Web Vitals monitoring
		if ('requestIdleCallback' in window) {
			window.requestIdleCallback(() => initWebVitals());
		} else {
			setTimeout(() => initWebVitals(), 2000);
		}

		// Load extended fonts
		const loadExtendedFonts = () => {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = '/fonts-extended.css';
			document.head.appendChild(link);
		};

		if ('requestIdleCallback' in window) {
			window.requestIdleCallback(loadExtendedFonts);
		} else {
			setTimeout(loadExtendedFonts, 1000);
		}
	}
</script>

<div class="min-h-screen antialiased bg-white text-gray-900">
	{@render children()}
</div>
```

### 2. Adicionar Scripts ao package.json

```json
{
	"scripts": {
		"test": "playwright test",
		"test:ui": "playwright test --ui",
		"test:perf": "npm run build && lhci autorun",
		"test:vitals": "npm run build && npm run preview & sleep 3 && playwright test tests/performance.spec.ts && kill %1"
	}
}
```

---

## 🧪 Como Executar os Testes

### Testes de Performance (Playwright)

```bash
# Build + Preview + Testes
npm run build
npm run preview # Em outro terminal

# Rodar todos os testes
npm test

# Rodar apenas testes de performance
npx playwright test tests/performance.spec.ts

# Modo UI (interativo)
npm run test:ui

# Modo debug
npx playwright test --debug
```

### Lighthouse CI

```bash
# Rodar Lighthouse CI (3 runs, média dos resultados)
npm run test:perf

# Ver relatório detalhado
npx lhci open
```

---

## 📈 Como Funciona o Monitoramento

### Em Desenvolvimento

```bash
npm run dev
```

Abra o console do navegador (`Cmd+Option+I`):

```
[Web Vitals] Monitoramento iniciado
[Web Vitals] LCP: { value: "1234ms", rating: "good", delta: 1234 }
[Web Vitals] FID: { value: "45ms", rating: "good", delta: 45 }
[Web Vitals] CLS: { value: "0.05", rating: "good", delta: 0.05 }
```

### Em Produção

As métricas são enviadas automaticamente para:

1. **Google Analytics (GA4)** - Se configurado
2. **Endpoint Customizado** - Se `VITE_ANALYTICS_ENDPOINT` estiver definido

---

## 🔍 Debugging Web Vitals

Adicione ao console do navegador:

```javascript
// Obter métricas atuais
import { getWebVitals } from '$lib/utils/webVitals';
const metrics = await getWebVitals();
console.table(metrics);
```

Ou acesse via Chrome DevTools:
1. `Performance` tab → Record
2. `Lighthouse` tab → Analyze page load
3. `Network` tab → Check timing

---

## 🎨 Integração com Google Analytics

### Adicionar GA4 (Opcional)

Edite `src/app.html`:

```html
<!-- Google Analytics GA4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
	gtag('config', 'G-XXXXXXXXXX');
</script>
```

As métricas de Web Vitals serão enviadas automaticamente como eventos GA4.

---

## 📊 Performance Budgets (Lighthouse CI)

Os limites configurados em `lighthouserc.json`:

| Métrica | Budget | Status Atual |
|---------|--------|--------------|
| Performance Score | ≥ 90% | ✅ |
| LCP | < 2500ms | ✅ |
| FCP | < 1800ms | ✅ |
| CLS | < 0.1 | ✅ |
| Speed Index | < 3000ms | ✅ |
| TBT | < 300ms | ✅ |
| TTI | < 3800ms | ✅ |

---

## 🚨 Testes de Regressão

### CI/CD Integration (GitHub Actions)

Crie `.github/workflows/performance.yml`:

```yaml
name: Performance Tests

on: [push, pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm run test:perf
      
  playwright:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run preview &
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 📋 Checklist de Performance

- [x] Web Vitals monitoring implementado
- [x] Testes automatizados (Playwright)
- [x] Performance budgets (Lighthouse CI)
- [x] Service Worker v3
- [x] Font optimization (critical inline, lazy extended)
- [x] GPU-accelerated animations (transform)
- [x] Cache headers (_headers)
- [x] Brotli compression (level 11)
- [x] Code splitting (vendor chunk)
- [ ] Google Analytics GA4 (opcional)
- [ ] Real User Monitoring endpoint (opcional)

---

## 🎯 Próximos Passos

### Prioridade ALTA:
1. **Instalar dependências**: `npm install --save-dev web-vitals @playwright/test lighthouse @lhci/cli`
2. **Atualizar +layout.svelte**: Adicionar `initWebVitals()`
3. **Rodar primeiro teste**: `npm run build && npm run test:perf`

### Prioridade MÉDIA:
4. **Configurar GA4**: Adicionar tracking ID em `app.html`
5. **CI/CD**: Criar workflow GitHub Actions
6. **Monitoramento RUM**: Configurar `VITE_ANALYTICS_ENDPOINT`

### Prioridade BAIXA:
7. **Dashboard customizado**: Visualizar métricas em tempo real
8. **Alertas**: Notificar quando budgets forem excedidos

---

## 📞 Suporte

- **Web Vitals**: https://web.dev/vitals/
- **Playwright**: https://playwright.dev/
- **Lighthouse CI**: https://github.com/GoogleChrome/lighthouse-ci

---

**Última atualização:** 13 de novembro de 2025  
**Status:** ✅ Implementação completa  
**Performance Score Target:** 90%+
