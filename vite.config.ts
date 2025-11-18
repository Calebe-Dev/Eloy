import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { compression } from 'vite-plugin-compression2';

export default defineConfig({
	plugins: [
		sveltekit(), // SvelteKit SEMPRE primeiro
		tailwindcss(), // Tailwind depois do Svelte processar
		devtoolsJson(),
		// Brotli compression (nível 11 = máxima compressão)
		compression({
			include: [/\.(js|mjs|json|css|html|svg)$/],
			threshold: 512
		})
	],
	build: {
		cssCodeSplit: true,
		cssMinify: 'esbuild', // esbuild é compatível com Svelte :global()
		minify: 'esbuild',
		target: 'esnext',
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['svelte']
				}
			}
		}
	}
});
