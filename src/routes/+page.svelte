<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import StructuredData from '$lib/components/StructuredData.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import LazySection from '$lib/components/ui/LazySection.svelte';
	import ChatbotEloi from '$lib/components/ui/ChatbotEloi.svelte';
	import ChatbotNotification from '$lib/components/ui/ChatbotNotification.svelte';
	import InteractionTips from '$lib/components/ui/InteractionTips.svelte';
	
	// Dynamic imports para lazy loading real
	const ChatMockup = () => import('$lib/components/ui/ChatMockup.svelte');
	const ProblemReveal = () => import('$lib/components/sections/ProblemReveal.svelte');
	const Solution = () => import('$lib/components/sections/Solution.svelte');
	const HowItWorks = () => import('$lib/components/sections/HowItWorks.svelte');
	const Pricing = () => import('$lib/components/sections/Pricing.svelte');
	const Stats = () => import('$lib/components/sections/Stats.svelte');
	const FAQ = () => import('$lib/components/sections/FAQ.svelte');
	const CTA = () => import('$lib/components/sections/CTA.svelte');
	const Footer = () => import('$lib/components/sections/Footer.svelte');
	
	let showChatbotNotification = $state(false);
	
	// Listener para quando o mockup completar
	function handleMockupComplete() {
		showChatbotNotification = true;
	}
</script>

<svelte:window on:eloi-mockup-completed={handleMockupComplete} />

<SEO />
<StructuredData />

<!-- Critical: Renders immediately -->
<Hero />

<!-- Lazy: Load when visible (Intersection Observer) -->
<LazySection component={ChatMockup} />
<LazySection component={ProblemReveal} />
<LazySection component={Solution} />
<LazySection component={HowItWorks} />
<LazySection component={Stats} />
<LazySection component={Pricing} />
<LazySection component={FAQ} />
<LazySection component={CTA} />
<LazySection component={Footer} />

<!-- Chatbot Eloi - Só aparece após o mockup ser completado -->
<ChatbotEloi />

<!-- Notificação quando chatbot aparecer -->
{#if showChatbotNotification}
	<ChatbotNotification delay={500} duration={6000} />
{/if}

<!-- Dicas de interação para guiar o usuário -->
<InteractionTips />
