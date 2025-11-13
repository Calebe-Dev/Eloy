<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	
	let {
		component,
		threshold = 0.1,
		rootMargin = '100px'
	}: {
		component: () => Promise<any>;
		threshold?: number;
		rootMargin?: string;
	} = $props();

	let containerRef: HTMLDivElement | undefined = $state();
	let Component = $state<any>(null);
	let isLoading = $state(false);

	onMount(() => {
		if (!browser || !containerRef) return;

		const observer = new IntersectionObserver(
			async (entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting && !Component && !isLoading) {
						isLoading = true;
						
						try {
							const module = await component();
							Component = module.default;
						} catch (error) {
							console.error('Failed to load component:', error);
						} finally {
							isLoading = false;
						}
						
						observer.disconnect();
					}
				}
			},
			{ threshold, rootMargin }
		);

		observer.observe(containerRef);

		return () => observer.disconnect();
	});
</script>

<div bind:this={containerRef} class="w-full">
	{#if Component}
		<Component />
	{:else if isLoading}
		<div class="w-full min-h-[200px] bg-gray-50/50 animate-pulse rounded-lg" aria-label="Carregando" role="status">
			<span class="sr-only">Carregando...</span>
		</div>
	{:else}
		<div class="w-full min-h-[100px]" aria-hidden="true"></div>
	{/if}
</div>
