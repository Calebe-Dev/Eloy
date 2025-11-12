<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		class: className = '',
		background = 'transparent',
		spacing = 'normal',
		children
	}: {
		class?: string;
		background?: 'transparent' | 'gray' | 'dark' | 'gradient';
		spacing?: 'none' | 'small' | 'normal' | 'large' | 'xlarge';
		children: Snippet;
	} = $props();

	const backgrounds = {
		transparent: 'bg-transparent',
		gray: 'bg-gray-50',
		dark: 'bg-gray-900 text-white',
		gradient: 'bg-gradient-to-b from-white via-blue-50/30 to-white'
	};

	const spacings = {
		none: 'py-0',
		small: 'py-8 md:py-12',
		normal: 'py-16 md:py-24 lg:py-32',
		large: 'py-24 md:py-32 lg:py-40',
		xlarge: 'py-32 md:py-40 lg:py-48'
	};
</script>

<section class={`${spacings[spacing]} ${backgrounds[background]} ${className}`}>
	{@render children()}
</section>
