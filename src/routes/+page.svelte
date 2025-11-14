<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import StructuredData from '$lib/components/StructuredData.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import LazySection from '$lib/components/ui/LazySection.svelte';
	import ChatbotEloi from '$lib/components/ui/ChatbotEloi.svelte';
	import ScrollHint from '$lib/components/ui/ScrollHint.svelte';
	import ChatbotHint from '$lib/components/ui/ChatbotHint.svelte';
	import InteractionHint from '$lib/components/ui/InteractionHint.svelte';
	import NotificationStack from '$lib/components/ui/NotificationStack.svelte';
	import WhatsAppButton from '$lib/components/ui/WhatsAppButton.svelte';
	
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

	let openChatbotFromHero = $state(false);

	function handleShowChatbot() {
		openChatbotFromHero = true;
	}
</script>

<SEO />
<StructuredData />

<!-- Botão fixo do WhatsApp -->
<WhatsAppButton />

<!-- Sistema de notificações em pilha -->
<NotificationStack />

<!-- Notificações de navegação -->
<ScrollHint />

<!-- Critical: Renders immediately -->
<Hero onShowChatbot={handleShowChatbot} />

<!-- Lazy: Load when visible (Intersection Observer) -->
<LazySection component={ChatMockup} />

<!-- Hint: ChatMockup apareceu -->
<InteractionHint
	message="Continue explorando"
	icon=""
	delay={1000}
	duration={6000}
	triggerOnScroll={true}
	scrollThreshold={300}
	gradient="from-purple-600 to-pink-600"
/>

<LazySection component={ProblemReveal} />

<!-- Hint: Seção de problemas -->
<InteractionHint
	message="Descubra mais"
	icon=""
	delay={800}
	duration={6000}
	triggerOnScroll={true}
	scrollThreshold={800}
	gradient="from-orange-600 to-red-600"
/>

<LazySection component={Solution} />

<!-- Hint: Solução -->
<InteractionHint
	message="Siga em frente"
	icon=""
	delay={600}
	duration={6000}
	triggerOnScroll={true}
	scrollThreshold={1400}
	gradient="from-green-600 to-emerald-600"
/>

<LazySection component={HowItWorks} />

<!-- Hint: Como funciona -->
<InteractionHint
	message="Há mais para ver"
	icon=""
	delay={500}
	duration={6000}
	triggerOnScroll={true}
	scrollThreshold={2000}
	gradient="from-blue-600 to-indigo-600"
/>

<LazySection component={Stats} />
<LazySection component={Pricing} />

<!-- Hint: Preços -->
<InteractionHint
	message="Continue rolando"
	icon=""
	delay={400}
	duration={6000}
	triggerOnScroll={true}
	scrollThreshold={3000}
	gradient="from-yellow-600 to-orange-600"
/>

<LazySection component={FAQ} />

<!-- Hint: FAQ -->
<InteractionHint
	message="Explore mais"
	icon=""
	delay={300}
	duration={6000}
	triggerOnScroll={true}
	scrollThreshold={3800}
	gradient="from-cyan-600 to-blue-600"
/>

<LazySection component={CTA} />
<LazySection component={Footer} />

<!-- Chatbot Eloi - Só aparece após o mockup ser completado -->
<ChatbotEloi forceOpen={openChatbotFromHero} />

<!-- Hint: Chatbot disponível (aparece quando chatbot realmente carregar) -->
<ChatbotHint duration={6000} />
