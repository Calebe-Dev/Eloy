<script lang="ts">
	import '../app.css';
	// @ts-ignore - Requires: npm install web-vitals
	import { initWebVitals } from '$lib/utils/webVitals';

	let { children } = $props();

	// Lazy load non-critical fonts and Web Vitals after initial render
	if (typeof window !== 'undefined') {
		// Web Vitals monitoring (non-blocking)
		if ('requestIdleCallback' in window) {
			window.requestIdleCallback(() => initWebVitals());
		} else {
			setTimeout(() => initWebVitals(), 2000);
		}

		// Use requestIdleCallback for better performance
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

		// Microsoft Clarity Analytics
		if ('requestIdleCallback' in window) {
			window.requestIdleCallback(() => {
				(function(c,l,a,r,i,t,y){
					c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
					t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
					y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
				})(window, document, "clarity", "script", "u83rp9vn2n");
			});
		} else {
			setTimeout(() => {
				(function(c,l,a,r,i,t,y){
					c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
					t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
					y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
				})(window, document, "clarity", "script", "u83rp9vn2n");
			}, 2000);
		}
	}
</script>

<div class="min-h-screen antialiased bg-white text-gray-900">
	{@render children()}
</div>
