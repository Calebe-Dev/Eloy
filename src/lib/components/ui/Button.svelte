<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		variant = 'primary',
		size = 'md',
		href,
		onclick,
		children
	}: {
		variant?: 'primary' | 'secondary' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		href?: string;
		onclick?: () => void;
		children: Snippet;
	} = $props();

	const baseStyles =
		'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-hidden focus:ring-2 focus:ring-offset-2';

	const variants = {
		primary: 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 focus:ring-blue-500',
		secondary:
			'bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:scale-105 focus:ring-white/50',
		ghost: 'text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:ring-blue-500'
	};

	const sizes = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-6 py-3 text-base',
		lg: 'px-8 py-4 text-lg'
	};

	const classes = `${baseStyles} ${variants[variant]} ${sizes[size]}`;
</script>

{#if href}
	<a {href} class={classes}>
		{@render children()}
	</a>
{:else}
	<button {onclick} class={classes}>
		{@render children()}
	</button>
{/if}
