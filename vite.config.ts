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
		// Brotli compression (nível 11 = máxima compressão)
		compression({
			algorithm: 'brotliCompress',
			exclude: [/\.(br)$/, /\.(gz)$/],
			threshold: 512,
			compressionOptions: { level: 11 }
		})
	],
	build: {
		cssCodeSplit: true,
		cssMinify: 'lightningcss', // Mais rápido que esbuild
		minify: 'esbuild',
		target: 'esnext',
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['svelte']
				}
			}
		}
	},
	css: {
		transformer: 'lightningcss',
		lightningcss: {
			drafts: {
				customMedia: true
			}
		}
	}
});
