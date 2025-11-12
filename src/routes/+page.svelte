<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	
	import SEO from '$lib/components/SEO.svelte';
	import StructuredData from '$lib/components/StructuredData.svelte';
	
	// Critical: Load immediately (above the fold)
	import Hero from '$lib/components/sections/Hero.svelte';
	
	// Non-critical: Lazy load after initial render
	let lazyComponents = $state<{
		ChatMockup: any;
		ProblemReveal: any;
		Solution: any;
		HowItWorks: any;
		Pricing: any;
		Stats: any;
		FAQ: any;
		CTA: any;
		Footer: any;
	}>({
		ChatMockup: null,
		ProblemReveal: null,
		Solution: null,
		HowItWorks: null,
		Pricing: null,
		Stats: null,
		FAQ: null,
		CTA: null,
		Footer: null
	});

	onMount(async () => {
		if (!browser) return;
		
		// Load non-critical components after Hero is rendered
		// This improves initial page load (LCP)
		const [
			ChatMockupModule,
			ProblemRevealModule,
			SolutionModule,
			HowItWorksModule,
			PricingModule,
			StatsModule,
			FAQModule,
			CTAModule,
			FooterModule
		] = await Promise.all([
			import('$lib/components/ui/ChatMockup.svelte'),
			import('$lib/components/sections/ProblemReveal.svelte'),
			import('$lib/components/sections/Solution.svelte'),
			import('$lib/components/sections/HowItWorks.svelte'),
			import('$lib/components/sections/Pricing.svelte'),
			import('$lib/components/sections/Stats.svelte'),
			import('$lib/components/sections/FAQ.svelte'),
			import('$lib/components/sections/CTA.svelte'),
			import('$lib/components/sections/Footer.svelte')
		]);

		lazyComponents = {
			ChatMockup: ChatMockupModule.default,
			ProblemReveal: ProblemRevealModule.default,
			Solution: SolutionModule.default,
			HowItWorks: HowItWorksModule.default,
			Pricing: PricingModule.default,
			Stats: StatsModule.default,
			FAQ: FAQModule.default,
			CTA: CTAModule.default,
			Footer: FooterModule.default
		};
	});
</script>

<SEO />
<StructuredData />

<!-- Critical: Renders immediately for fast LCP -->
<Hero />

<!-- Lazy: Renders after Hero is ready -->
{#if lazyComponents.ChatMockup}
	{@const Component = lazyComponents.ChatMockup}
	<Component />
{/if}

{#if lazyComponents.ProblemReveal}
	{@const Component = lazyComponents.ProblemReveal}
	<Component />
{/if}

{#if lazyComponents.Solution}
	{@const Component = lazyComponents.Solution}
	<Component />
{/if}

{#if lazyComponents.HowItWorks}
	{@const Component = lazyComponents.HowItWorks}
	<Component />
{/if}

{#if lazyComponents.Pricing}
	{@const Component = lazyComponents.Pricing}
	<Component />
{/if}

{#if lazyComponents.Stats}
	{@const Component = lazyComponents.Stats}
	<Component />
{/if}

{#if lazyComponents.FAQ}
	{@const Component = lazyComponents.FAQ}
	<Component />
{/if}

{#if lazyComponents.CTA}
	{@const Component = lazyComponents.CTA}
	<Component />
{/if}

{#if lazyComponents.Footer}
	{@const Component = lazyComponents.Footer}
	<Component />
{/if}
