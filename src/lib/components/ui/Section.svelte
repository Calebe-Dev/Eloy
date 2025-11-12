<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		class: className = '',
		background = 'transparent',
		children
	}: {
		class?: string;
		background?: 'transparent' | 'gray' | 'dark' | 'gradient';
		children: Snippet;
	} = $props();

	const backgrounds = {
		transparent: 'bg-transparent',
		gray: 'bg-gray-50',
		dark: 'bg-gray-900 text-white',
		gradient: 'bg-gradient-to-b from-white via-blue-50/30 to-white'
	};
</script>

<section class={`py-20 lg:py-32 ${backgrounds[background]} ${className}`}>
	{@render children()}
</section>
