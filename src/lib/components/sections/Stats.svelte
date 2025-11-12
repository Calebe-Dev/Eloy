<script lang="ts">
	import { onMount } from 'svelte';
	import CounterAnimation from '../ui/CounterAnimation.svelte';

	let sectionElement: HTMLElement;
	let scrollProgress = $state(0);
	let isInView = $state(false);

	const stats = [
		{
			value: 2,
			suffix: 'M+',
			title: 'conversas processadas',
			subtitle: 'Taxa de satisfação:',
			highlight: '94%',
			color: 'from-blue-500 to-cyan-500',
			bgGlow: 'from-blue-500/20 to-cyan-500/20'
		},
		{
			value: 3,
			suffix: 'x',
			title: 'mais leads capturados',
			subtitle: 'Em comparação com atendimento manual',
			highlight: null,
			color: 'from-purple-500 to-pink-500',
			bgGlow: 'from-purple-500/20 to-pink-500/20'
		},
		{
			value: 340,
			suffix: '%',
			title: 'de melhoria em eficiência',
			subtitle: 'Redução em tempo de resposta',
			highlight: null,
			color: 'from-green-500 to-emerald-500',
			bgGlow: 'from-green-500/20 to-emerald-500/20'
		}
	];

	onMount(() => {
		const handleScroll = () => {
			if (!sectionElement) return;
			
			const rect = sectionElement.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			
			// Calcula se está visível
			isInView = rect.top < windowHeight && rect.bottom > 0;
			
			// Calcula progresso quando está no centro da tela
			const centerY = rect.top + rect.height / 2;
			const centerScreen = windowHeight / 2;
			const distance = Math.abs(centerY - centerScreen);
			const maxDistance = windowHeight;
			
			scrollProgress = Math.max(0, Math.min(1, 1 - (distance / maxDistance)));
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<section class="relative py-24 md:py-32 lg:py-40 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
	<!-- Background decorativo -->
	<div class="absolute inset-0">
		<!-- Grid animado -->
		<div class="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
		
		<!-- Orbs de fundo animados com scroll -->
		<div 
			class="absolute top-1/4 -left-48 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl transition-all duration-1000"
			style="transform: translateX({scrollProgress * 100}px) scale({0.8 + scrollProgress * 0.4});"
		></div>
		<div 
			class="absolute bottom-1/4 -right-48 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl transition-all duration-1000"
			style="transform: translateX({scrollProgress * -100}px) scale({0.8 + scrollProgress * 0.4});"
		></div>
	</div>

	<div bind:this={sectionElement} class="relative max-w-7xl mx-auto px-6">
		<!-- Header -->
		<div 
			class="text-center mb-16 md:mb-24 transition-all duration-1000 ease-out"
			style="
				opacity: {Math.min(1, scrollProgress * 2)};
				transform: translateY({Math.max(0, 40 - scrollProgress * 50)}px);
			"
		>
			<h2 class="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 tracking-tight">
				Números que Falam
			</h2>
			<p class="text-xl md:text-2xl text-gray-500 font-light max-w-2xl mx-auto">
				Resultados reais de quem já confia no Eloi
			</p>
		</div>

		<!-- Stats Grid -->
		<div class="grid md:grid-cols-3 gap-6 md:gap-8">
			{#each stats as stat, index}
				<div 
					class="relative transition-all duration-1000 ease-out"
					style="
						opacity: {Math.min(1, Math.max(0, (scrollProgress - index * 0.1) * 2.5))};
						transform: translateY({Math.max(0, 60 - scrollProgress * 80)}px) scale({0.9 + Math.min(0.1, scrollProgress * 0.15)});
					"
				>
					<!-- Card com efeito de brilho -->
					<div class="group relative h-full">
						<!-- Glow effect -->
						<div 
							class="absolute -inset-0.5 bg-gradient-to-r {stat.color} rounded-[2rem] opacity-0 group-hover:opacity-20 blur transition-all duration-500"
							style="opacity: {scrollProgress * 0.15};"
						></div>
						
						<!-- Card principal -->
						<div class="relative bg-white rounded-[2rem] p-8 md:p-10 h-full border border-gray-200 hover:border-gray-300 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
							<!-- Badge decorativo no canto -->
							<div 
								class="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br {stat.bgGlow} rounded-full blur-2xl transition-all duration-1000"
								style="opacity: {scrollProgress};"
							></div>

							<div class="relative space-y-6 text-center">
								<!-- Número gigante com counter -->
								<div class="relative">
									{#if isInView && scrollProgress > 0.3}
										<div 
											class="text-7xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r {stat.color} bg-clip-text text-transparent leading-none transition-all duration-1000"
											style="transform: scale({0.8 + scrollProgress * 0.2});"
										>
											<CounterAnimation 
												target={stat.value} 
												suffix={stat.suffix}
												delay={index * 200}
											/>
										</div>
									{:else}
										<div 
											class="text-7xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r {stat.color} bg-clip-text text-transparent leading-none"
										>
											0{stat.suffix}
										</div>
									{/if}
									
									<!-- Linha decorativa -->
									<div 
										class="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r {stat.color} rounded-full transition-all duration-1000"
										style="width: {scrollProgress * 100}px; max-width: 120px;"
									></div>
								</div>

								<!-- Título -->
								<div class="space-y-2 pt-4">
									<h3 class="text-xl md:text-2xl font-semibold text-gray-900 leading-snug">
										{stat.title}
									</h3>
									
									<!-- Subtítulo -->
									<p class="text-base md:text-lg text-gray-600 leading-relaxed">
										{stat.subtitle}
										{#if stat.highlight}
											<span class="font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent ml-1">
												{stat.highlight}
											</span>
										{/if}
									</p>
								</div>

								<!-- Ícone decorativo -->
								<div class="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
									<div class="w-12 h-12 mx-auto bg-gradient-to-r {stat.color} rounded-2xl flex items-center justify-center shadow-lg">
										<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
										</svg>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- CTA Footer -->
		<div 
			class="text-center mt-16 md:mt-24 transition-all duration-1000 ease-out"
			style="
				opacity: {Math.min(1, Math.max(0, (scrollProgress - 0.4) * 2))};
				transform: translateY({Math.max(0, 30 - scrollProgress * 40)}px);
			"
		>
			<div class="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100">
				<div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
				<p class="text-gray-700 font-medium">
					Junte-se a mais de <span class="font-bold text-blue-600">500+ empresas</span> que já transformaram seu atendimento
				</p>
			</div>
		</div>
	</div>
</section>
