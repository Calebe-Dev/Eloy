<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		size = 'default',
		class: className = '',
		children
	}: {
		size?: 'sm' | 'default' | 'lg' | 'full';
		class?: string;
		children: Snippet;
	} = $props();

	const sizes = {
		sm: 'max-w-4xl',
		default: 'max-w-6xl',
		lg: 'max-w-7xl',
		full: 'max-w-full'
	};
</script>

<div class={`mx-auto px-4 sm:px-6 lg:px-8 ${sizes[size]} ${className}`}>
	{@render children()}
</div>
