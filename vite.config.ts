import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { compression } from 'vite-plugin-compression2';

export default defineConfig({
	plugins: [
		tailwindcss(), 
		sveltekit(), 
		devtoolsJson(),
		// Brotli compression for better performance
		compression({
			include: /\.(js|css|html|json|svg)$/,
			threshold: 1024 // Only compress files > 1KB
		})
	],
	build: {
		cssCodeSplit: true, // Split CSS for better caching
		minify: 'esbuild', // esbuild is faster and preserves animations
		rollupOptions: {
			output: {
				// Separate vendor code for better caching
				manualChunks: (id) => {
					if (id.includes('node_modules')) {
						return 'vendor';
					}
				}
			}
		}
	}
});
