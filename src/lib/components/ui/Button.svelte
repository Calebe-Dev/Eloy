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
		primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl focus:ring-blue-500',
		secondary:
			'bg-white text-gray-900 border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 hover:scale-105 hover:shadow-lg focus:ring-blue-500',
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
