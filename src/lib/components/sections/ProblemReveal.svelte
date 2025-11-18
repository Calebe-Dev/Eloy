<script lang="ts">
	import { onMount } from 'svelte';

	const textBlocks = [
		{
			id: 1,
			text: 'Seus clientes exigem presença',
			highlight: '24 horas por dia',
			color: 'from-blue-400 to-cyan-400'
		},
		{
			id: 2,
			text: 'Sua equipe não consegue estar',
			highlight: 'sempre lá',
			color: 'from-purple-400 to-pink-400'
		},
		{
			id: 3,
			text: 'Quando a resposta não vem,',
			highlight: 'a oportunidade vai embora',
			color: 'from-red-400 to-orange-400',
			isFinal: true
		}
	];

	let pinWrapper: HTMLDivElement;
	let scrollProgress = $state(0);
	let visibleIndex = $state(0);
	let isInView = $state(false);

	onMount(() => {
		const recalc = () => {
			if (!pinWrapper) return;
			
			const viewportCenter = window.innerHeight / 2;
			const rect = pinWrapper.getBoundingClientRect();
			const docTop = window.scrollY + rect.top;
			const docBottom = docTop + rect.height;
			const centerDocY = window.scrollY + viewportCenter;

			// Verifica se está na viewport
			isInView = rect.top < window.innerHeight && rect.bottom > 0;

			// Calcula quando a seção está centrada
			const start = docTop + viewportCenter;
			const end = docBottom - viewportCenter;
			const total = Math.max(end - start, 1);
			const passed = Math.min(Math.max(centerDocY - start, 0), total);
			const progress = passed / total;
			
			scrollProgress = progress;

			// Determina qual texto mostrar baseado no progresso
			if (progress < 0.33) {
				visibleIndex = 0;
			} else if (progress < 0.66) {
				visibleIndex = 1;
			} else {
				visibleIndex = 2;
			}
		};

		recalc();
		window.addEventListener('scroll', recalc, { passive: true });
		window.addEventListener('resize', recalc);

		return () => {
			window.removeEventListener('scroll', recalc);
			window.removeEventListener('resize', recalc);
		};
	});
</script>

<div class="w-full relative bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900" data-problem-section>
	<!-- Pin wrapper para controlar a duração do scroll -->
	<div bind:this={pinWrapper} class="relative" style="height: 300vh;">
		<!-- Background sticky que fica fixo durante o scroll da seção -->
		<div class="sticky top-0 left-0 w-full h-screen overflow-hidden">
			<!-- Elementos decorativos de fundo com parallax -->
			<div class="absolute inset-0 pointer-events-none">
				<!-- Grid animado -->
				<div class="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
				
				<!-- Partículas flutuantes -->
				<div class="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-float" style="animation-delay: 0s;"></div>
				<div class="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400/40 rounded-full animate-float" style="animation-delay: 1s;"></div>
				<div class="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-float" style="animation-delay: 2s;"></div>
				<div class="absolute top-2/3 right-1/3 w-2 h-2 bg-pink-400/30 rounded-full animate-float" style="animation-delay: 1.5s;"></div>
				
				<!-- Orbs com gradiente -->
				<div 
					class="absolute top-1/4 -left-48 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl transition-transform duration-300"
					style="transform: translateY({scrollProgress * -100}px);"
				></div>
				<div 
					class="absolute bottom-1/4 -right-48 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl transition-transform duration-300"
					style="transform: translateY({scrollProgress * 100}px);"
				></div>
				<div 
					class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-3xl transition-opacity duration-500"
					style="opacity: {scrollProgress};"
				></div>
				
				<!-- Linha de scan sutil -->
				<div 
					class="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-32 animate-scan"
					style="opacity: {0.3 + scrollProgress * 0.2};"
				></div>
			</div>
			
			<!-- Conteúdo que fica no centro da tela durante a seção -->
			<div class="absolute top-0 left-0 w-full h-screen flex items-center justify-center">
			<div class="max-w-6xl mx-auto px-6 w-full">
				<!-- Container dos textos -->
				<div class="relative w-full min-h-[300px]">
					{#each textBlocks as block, index}
						<div 
							class="absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-1000 ease-out"
							style="
								opacity: {visibleIndex === index ? 1 : 0};
								transform: translateY({visibleIndex === index ? 0 : visibleIndex > index ? -60 : 60}px) scale({visibleIndex === index ? 1 : 0.9});
								filter: blur({visibleIndex === index ? 0 : 12}px);
								pointer-events: {visibleIndex === index ? 'auto' : 'none'};
							"
						>
							{#if block.isFinal}
								<!-- Texto final com destaque especial -->
								<div class="space-y-8 w-full px-4">
									<h2 class="text-3xl md:text-4xl lg:text-5xl font-light text-gray-100 leading-tight">
										{block.text}
									</h2>
									<div class="relative">
										<!-- Texto principal com gradiente -->
										<h3 class="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight px-4"
											style="background: linear-gradient(to right, rgb(96, 165, 250), rgb(34, 211, 238)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
											{block.highlight}.
										</h3>
										
										<!-- Sublinhado animado -->
										<div 
											class="mx-auto mt-4 h-1 rounded-full transition-all duration-1000 ease-out"
											style="
												width: {visibleIndex === index ? '80%' : '0%'}; 
												max-width: 400px;
												background: linear-gradient(to right, rgb(248, 113, 113), rgb(251, 146, 60));
											"
										></div>
									</div>
								</div>
							{:else}
								<!-- Textos normais com efeito de reveal -->
								<div class="w-full px-4">
									<h2 class="text-3xl md:text-5xl lg:text-6xl font-light leading-tight">
										<span class="block mb-4 text-gray-200">{block.text}</span>
										<span class="block font-bold text-4xl md:text-6xl"
											style="background: linear-gradient(to right, {index === 0 ? 'rgb(96, 165, 250), rgb(34, 211, 238)' : 'rgb(192, 132, 252), rgb(236, 72, 153)'}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
											{block.highlight}.
										</span>
									</h2>
								</div>
							{/if}

							<!-- Efeito de partículas ao redor do texto ativo -->
							{#if visibleIndex === index}
								<div class="absolute inset-0 pointer-events-none overflow-visible z-20">
									<div class="absolute top-1/4 left-1/4 w-2 h-2 rounded-full animate-ping"
										style="background: linear-gradient(to right, {index === 0 ? 'rgb(96, 165, 250), rgb(34, 211, 238)' : index === 1 ? 'rgb(192, 132, 252), rgb(236, 72, 153)' : 'rgb(248, 113, 113), rgb(251, 146, 60)'});"></div>
									<div class="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full animate-ping" 
										style="background: linear-gradient(to right, {index === 0 ? 'rgb(96, 165, 250), rgb(34, 211, 238)' : index === 1 ? 'rgb(192, 132, 252), rgb(236, 72, 153)' : 'rgb(248, 113, 113), rgb(251, 146, 60)'}); animation-delay: 0.5s;"></div>
								</div>
							{/if}
						</div>
					{/each}
				</div>

				<!-- Indicador de progresso elegante - fixo na parte inferior -->
				<div class="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4">
					{#each textBlocks as block, index}
						<div class="flex flex-col items-center gap-2 transition-all duration-500">
							<!-- Bolinha do indicador -->
							<div 
								class="relative rounded-full transition-all duration-500"
								class:w-3={visibleIndex !== index}
								class:h-3={visibleIndex !== index}
								class:w-4={visibleIndex === index}
								class:h-4={visibleIndex === index}
							>
								<!-- Background -->
								<div 
									class="absolute inset-0 rounded-full transition-all duration-500"
									class:bg-gray-600={visibleIndex !== index}
									class:bg-gradient-to-r={visibleIndex === index}
									class:from-blue-400={visibleIndex === index && index === 0}
									class:to-cyan-400={visibleIndex === index && index === 0}
									class:from-purple-400={visibleIndex === index && index === 1}
									class:to-pink-400={visibleIndex === index && index === 1}
									class:from-red-400={visibleIndex === index && index === 2}
									class:to-orange-400={visibleIndex === index && index === 2}
								></div>
								
								<!-- Glow effect -->
								{#if visibleIndex === index}
									<div class="absolute inset-0 rounded-full bg-gradient-to-r {block.color} blur-md opacity-50 animate-pulse"></div>
								{/if}
							</div>
							
							<!-- Linha conectora (horizontal agora) -->
							{#if index < textBlocks.length - 1}
								<div 
									class="w-12 h-px transition-all duration-500 absolute left-full top-1/2 -translate-y-1/2 ml-1"
									class:bg-gray-700={visibleIndex <= index}
									class:bg-gradient-to-r={visibleIndex > index}
									class:from-gray-400={visibleIndex > index}
									class:to-gray-700={visibleIndex > index}
								></div>
							{/if}
						</div>
					{/each}
				</div>

				<!-- Scroll hint -->
				{#if scrollProgress < 0.1}
					<div 
						class="absolute bottom-12 left-1/2 -translate-x-1/2 transition-opacity duration-1000"
						style="opacity: {1 - scrollProgress * 10};"
					>
						<div class="flex flex-col items-center gap-2 text-gray-500">
							<span class="text-sm uppercase tracking-wider">Role para continuar</span>
							<svg class="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
							</svg>
						</div>
					</div>
				{/if}
			</div>
			</div>
		</div>
	</div>
</div>
