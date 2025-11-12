import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		// Use the static adapter and enable prerendering for all entries
		adapter: adapter(),
		prerender: { 
			entries: ['*'],
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore 404s for missing favicons during build
				if (path.includes('favicon') || path.includes('apple-touch-icon')) {
					console.warn(`Missing favicon: ${path}`);
					return;
				}
				throw new Error(message);
			},
			handleMissingId: ({ id, path, message }) => {
				// Ignore missing anchor IDs (can be added later)
				console.warn(`Missing anchor #${id} on ${path}`);
			}
		}
	}
};

export default config;
