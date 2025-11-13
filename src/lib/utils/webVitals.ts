// Web Vitals Monitoring
// Baseado em: https://github.com/GoogleChrome/web-vitals
// @ts-nocheck - Requires: npm install web-vitals

import { onCLS, onFCP, onLCP, onTTFB, onINP, type Metric } from 'web-vitals';

interface VitalsData {
	name: string;
	value: number;
	rating: 'good' | 'needs-improvement' | 'poor';
	delta: number;
	id: string;
}

// Thresholds baseados no Google
const THRESHOLDS = {
	LCP: { good: 2500, poor: 4000 },
	INP: { good: 200, poor: 500 },
	CLS: { good: 0.1, poor: 0.25 },
	FCP: { good: 1800, poor: 3000 },
	TTFB: { good: 800, poor: 1800 }
};

function getRating(name: keyof typeof THRESHOLDS, value: number): 'good' | 'needs-improvement' | 'poor' {
	const threshold = THRESHOLDS[name];
	if (value <= threshold.good) return 'good';
	if (value <= threshold.poor) return 'needs-improvement';
	return 'poor';
}

function sendToAnalytics(metric: Metric) {
	const vitalsData: VitalsData = {
		name: metric.name,
		value: metric.value,
		rating: getRating(metric.name as keyof typeof THRESHOLDS, metric.value),
		delta: metric.delta,
		id: metric.id
	};

	// Log no console em desenvolvimento
	if (import.meta.env.DEV) {
		console.log(`[Web Vitals] ${metric.name}:`, {
			value: `${Math.round(metric.value)}ms`,
			rating: vitalsData.rating,
			delta: Math.round(metric.delta)
		});
	}

	// Enviar para Google Analytics (GA4)
	// @ts-ignore - gtag is loaded via external script
	if (typeof gtag !== 'undefined') {
		// @ts-ignore
		gtag('event', metric.name, {
			event_category: 'Web Vitals',
			value: Math.round(metric.value),
			event_label: metric.id,
			non_interaction: true
		});
	}

	// Enviar para endpoint customizado (opcional)
	if (import.meta.env.VITE_ANALYTICS_ENDPOINT) {
		fetch(import.meta.env.VITE_ANALYTICS_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(vitalsData),
			keepalive: true
		}).catch(() => {
			// Silently fail
		});
	}
}

export function initWebVitals() {
	if (typeof window === 'undefined') return;

	onCLS(sendToAnalytics);
	onFCP(sendToAnalytics);
	onLCP(sendToAnalytics);
	onTTFB(sendToAnalytics);
	onINP(sendToAnalytics);

	console.log('[Web Vitals] Monitoramento iniciado');
}

// Debug: Exportar métricas atuais
export async function getWebVitals() {
	const metrics: VitalsData[] = [];
	
	const handlers = [
		new Promise<void>((resolve) => onLCP((m: Metric) => { metrics.push({ name: m.name, value: m.value, rating: getRating('LCP', m.value), delta: m.delta, id: m.id }); resolve(); })),
		new Promise<void>((resolve) => onINP((m: Metric) => { metrics.push({ name: m.name, value: m.value, rating: getRating('INP', m.value), delta: m.delta, id: m.id }); resolve(); })),
		new Promise<void>((resolve) => onCLS((m: Metric) => { metrics.push({ name: m.name, value: m.value, rating: getRating('CLS', m.value), delta: m.delta, id: m.id }); resolve(); })),
		new Promise<void>((resolve) => onFCP((m: Metric) => { metrics.push({ name: m.name, value: m.value, rating: getRating('FCP', m.value), delta: m.delta, id: m.id }); resolve(); })),
		new Promise<void>((resolve) => onTTFB((m: Metric) => { metrics.push({ name: m.name, value: m.value, rating: getRating('TTFB', m.value), delta: m.delta, id: m.id }); resolve(); }))
	];

	await Promise.race([Promise.all(handlers), new Promise(r => setTimeout(r, 5000))]);
	return metrics;
}
