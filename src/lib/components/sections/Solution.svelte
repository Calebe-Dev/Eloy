<script lang="ts">
	import Section from '../ui/Section.svelte';
	import Container from '../ui/Container.svelte';
	import { onMount } from 'svelte';

	let sectionElement: HTMLElement;
	let scrollProgress = $state(0);

	onMount(() => {
		const handleScroll = () => {
			if (!sectionElement) return;
			
			const rect = sectionElement.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			
			// Calcula progresso quando a seção está visível (0 = topo fora, 1 = totalmente visível)
			const progress = Math.max(0, Math.min(1, 
				(windowHeight - rect.top) / (windowHeight + rect.height)
			));
			
			scrollProgress = progress;
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<Section background="gradient" class="relative overflow-hidden">
	<div bind:this={sectionElement} class="relative">
		<Container>
			<div class="text-center max-w-5xl mx-auto space-y-16 md:space-y-20">
				<!-- Título com fade in suave -->
				<div 
					class="transition-all duration-1000 ease-out"
					style="
						opacity: {Math.min(1, scrollProgress * 2)};
						transform: translateY({20 - scrollProgress * 20}px);
					"
				>
					<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
						Eloi — A voz digital que conecta <br class="hidden md:block" />
						sua marca às pessoas
					</h2>
					<p class="text-lg md:text-xl lg:text-2xl text-gray-600 mt-6 font-light max-w-3xl mx-auto">
						Um vendedor que nunca dorme, nunca erra, nunca cansa.
					</p>
				</div>

				<!-- Grid de cards com animação staggered -->
				<div class="grid md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
					<!-- Card 1: Presença Constante -->
					<div 
						class="transition-all duration-1000 ease-out"
						style="
							opacity: {Math.min(1, Math.max(0, (scrollProgress - 0.2) * 2.5))};
							transform: translateY({30 - Math.min(30, scrollProgress * 50)}px) scale({0.95 + Math.min(0.05, scrollProgress * 0.1)});
						"
					>
						<div class="group space-y-5 p-8 rounded-3xl bg-white/50 backdrop-blur-sm border border-gray-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 h-full">
							<div class="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
								<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
								</svg>
							</div>
							<h3 class="text-xl md:text-2xl font-semibold text-gray-900">Presença Constante</h3>
							<p class="text-gray-600 leading-relaxed">
								Atende 24/7 sem custos operacionais crescentes. Sem faltas. Sem imprevistos.
							</p>
						</div>
					</div>

					<!-- Card 2: Humanidade Verdadeira -->
					<div 
						class="transition-all duration-1000 ease-out"
						style="
							opacity: {Math.min(1, Math.max(0, (scrollProgress - 0.3) * 2.5))};
							transform: translateY({40 - Math.min(40, scrollProgress * 60)}px) scale({0.95 + Math.min(0.05, scrollProgress * 0.1)});
						"
					>
						<div class="group space-y-5 p-8 rounded-3xl bg-white/50 backdrop-blur-sm border border-gray-200/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2 h-full">
							<div class="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
								<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
								</svg>
							</div>
							<h3 class="text-xl md:text-2xl font-semibold text-gray-900">Humanidade Verdadeira</h3>
							<p class="text-gray-600 leading-relaxed">
								Entende contexto. Responde com empatia. Fala como sua marca.
							</p>
						</div>
					</div>

					<!-- Card 3: Conversão Inteligente -->
					<div 
						class="transition-all duration-1000 ease-out"
						style="
							opacity: {Math.min(1, Math.max(0, (scrollProgress - 0.4) * 2.5))};
							transform: translateY({50 - Math.min(50, scrollProgress * 70)}px) scale({0.95 + Math.min(0.05, scrollProgress * 0.1)});
						"
					>
						<div class="group space-y-5 p-8 rounded-3xl bg-white/50 backdrop-blur-sm border border-gray-200/50 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:-translate-y-2 h-full">
							<div class="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
								<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
								</svg>
							</div>
							<h3 class="text-xl md:text-2xl font-semibold text-gray-900">Conversão Inteligente</h3>
							<p class="text-gray-600 leading-relaxed">
								Qualifica leads, sugere soluções, fecha vendas enquanto você dorme.
							</p>
						</div>
					</div>
					</div>
			</div>
		</Container>
	</div>
</Section>
