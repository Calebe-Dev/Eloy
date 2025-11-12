<script lang="ts">
	import { onMount } from 'svelte';
	import Section from '../ui/Section.svelte';
	import Container from '../ui/Container.svelte';
	import AnimatedBlock from '../ui/AnimatedBlock.svelte';
	import ScrollProgressBar from '../ui/ScrollProgressBar.svelte';

	let sectionElement = $state<HTMLElement>();
	let currentStep = $state(0);
	const totalSteps = 3;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// Anima os passos em sequência
						setTimeout(() => { currentStep = 1; }, 200);
						setTimeout(() => { currentStep = 2; }, 600);
						setTimeout(() => { currentStep = 3; }, 1000);
					}
				});
			},
			{ threshold: 0.2 }
		);

		if (sectionElement) {
			observer.observe(sectionElement);
		}

		return () => observer.disconnect();
	});
</script>

<Section background="gray">
	<Container>
		<div bind:this={sectionElement} class="max-w-6xl mx-auto space-y-16 md:space-y-20">
			<AnimatedBlock>
				<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900">Como Funciona</h2>
			</AnimatedBlock>

			<div class="grid md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
				<AnimatedBlock delay={200}>
					<div class="relative space-y-6 p-8 rounded-3xl bg-white hover:shadow-lg transition-all duration-300">
						<div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white text-2xl font-bold shadow-lg shadow-blue-500/30">
							1
						</div>
						<h3 class="text-2xl lg:text-3xl font-semibold text-gray-900">Configuração Simples</h3>
						<p class="text-gray-600 leading-relaxed text-lg">
							Você define a personalidade, produtos e tom de voz do Eloi. Pronto. Começa a trabalhar em minutos.
						</p>
						<!-- Connection line -->
						<div class="hidden md:block absolute top-12 -right-8 lg:-right-12 w-8 lg:w-12 h-0.5 bg-gradient-to-r from-blue-200 to-transparent"></div>
					</div>
				</AnimatedBlock>

				<AnimatedBlock delay={400}>
					<div class="relative space-y-6 p-8 rounded-3xl bg-white hover:shadow-lg transition-all duration-300">
						<div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white text-2xl font-bold shadow-lg shadow-purple-500/30">
							2
						</div>
						<h3 class="text-2xl lg:text-3xl font-semibold text-gray-900">Aprendizado Contínuo</h3>
						<p class="text-gray-600 leading-relaxed text-lg">
							Cada conversa melhora a próxima. Eloi se adapta, refina, evolui.
						</p>
						<!-- Connection line -->
						<div class="hidden md:block absolute top-12 -right-8 lg:-right-12 w-8 lg:w-12 h-0.5 bg-gradient-to-r from-purple-200 to-transparent"></div>
					</div>
				</AnimatedBlock>

				<AnimatedBlock delay={600}>
					<div class="space-y-6 p-8 rounded-3xl bg-white hover:shadow-lg transition-all duration-300">
						<div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white text-2xl font-bold shadow-lg shadow-green-500/30">
							3
						</div>
						<h3 class="text-2xl lg:text-3xl font-semibold text-gray-900">Integração Total</h3>
						<p class="text-gray-600 leading-relaxed text-lg">
							Web, WhatsApp, Facebook, Instagram. Escolha seus canais. Eloi está lá.
						</p>
					</div>
				</AnimatedBlock>
			</div>

			<!-- Barra de progresso independente para esta seção -->
			<ScrollProgressBar 
				bind:targetElement={sectionElement}
				{totalSteps}
				{currentStep}
				position="bottom-center"
			/>
		</div>
	</Container>
</Section>
