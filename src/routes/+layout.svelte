<script lang="ts">
	import '../app.css';

	let { children } = $props();

	// Lazy load non-critical fonts after initial render
	if (typeof window !== 'undefined') {
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
	}
</script>

<div class="min-h-screen antialiased bg-white text-gray-900">
	{@render children()}
</div>
