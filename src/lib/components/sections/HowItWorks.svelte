<script lang="ts">
	import { onMount } from 'svelte';

	let pinWrapper: HTMLElement;
	let scrollProgress = $state(0);
	let visibleStep = $state(0);

	const steps = [
		{
			number: 1,
			title: 'Configuração Simples',
			description: 'Você define a personalidade, produtos e tom de voz do Eloi. Pronto. Começa a trabalhar em minutos.',
			color: 'from-blue-500 to-blue-600',
			bgColor: 'from-blue-500/20 to-blue-600/20'
		},
		{
			number: 2,
			title: 'Aprendizado Contínuo',
			description: 'Cada conversa melhora a próxima. Eloi se adapta, refina, evolui.',
			color: 'from-purple-500 to-purple-600',
			bgColor: 'from-purple-500/20 to-purple-600/20'
		},
		{
			number: 3,
			title: 'Integração Total',
			description: 'Web, WhatsApp, Facebook, Instagram. Escolha seus canais. Eloi está lá.',
			color: 'from-green-500 to-green-600',
			bgColor: 'from-green-500/20 to-green-600/20'
		}
	];

	onMount(() => {
		const recalc = () => {
			if (!pinWrapper) return;

			const rect = pinWrapper.getBoundingClientRect();
			const start = rect.top + window.scrollY;
			const end = start + pinWrapper.offsetHeight;
			const centerDocY = window.scrollY + window.innerHeight / 2;

			// Calcula o progresso (0 a 1)
			const total = end - start;
			const passed = Math.min(Math.max(centerDocY - start, 0), total);
			scrollProgress = passed / total;

			// Define qual passo está visível
			if (scrollProgress < 0.33) {
				visibleStep = 0;
			} else if (scrollProgress < 0.66) {
				visibleStep = 1;
			} else {
				visibleStep = 2;
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

<div class="w-full relative bg-gradient-to-b from-gray-50 via-white to-gray-50">
	<!-- Pin wrapper para controlar a duração do scroll -->
	<div bind:this={pinWrapper} class="relative" style="height: 300vh;">
		<!-- Background sticky que fica fixo durante o scroll da seção -->
		<div class="sticky top-0 left-0 w-full h-screen overflow-hidden">
			<!-- Elementos decorativos de fundo -->
			<div class="absolute inset-0 pointer-events-none">
				<!-- Grid sutil -->
				<div class="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30"></div>
				
				<!-- Orbs coloridos que mudam com cada passo -->
				<div 
					class="absolute top-1/4 -left-32 w-64 h-64 rounded-full blur-3xl transition-all duration-1000"
					style="
						background: linear-gradient(to bottom right, 
							{visibleStep === 0 ? 'rgb(96, 165, 250, 0.3), rgb(34, 211, 238, 0.3)' : 
							 visibleStep === 1 ? 'rgb(192, 132, 252, 0.3), rgb(236, 72, 153, 0.3)' : 
							 'rgb(74, 222, 128, 0.3), rgb(16, 185, 129, 0.3)'});
					"
				></div>
				<div 
					class="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full blur-3xl transition-all duration-1000"
					style="
						background: linear-gradient(to bottom right, 
							{visibleStep === 0 ? 'rgb(34, 211, 238, 0.3), rgb(96, 165, 250, 0.3)' : 
							 visibleStep === 1 ? 'rgb(236, 72, 153, 0.3), rgb(192, 132, 252, 0.3)' : 
							 'rgb(16, 185, 129, 0.3), rgb(74, 222, 128, 0.3)'});
					"
				></div>
			</div>
			
			<!-- Conteúdo que fica no centro da tela durante a seção -->
			<div class="absolute top-0 left-0 w-full h-screen flex items-center justify-center">
				<div class="max-w-4xl mx-auto px-6 w-full">
					<!-- Título fixo no topo -->
					<div class="text-center mb-16">
						<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
							Como Funciona
						</h2>
						<div class="flex items-center justify-center gap-2 mt-8">
							{#each steps as _, i}
								<div 
									class="h-1.5 rounded-full transition-all duration-500"
									style="
										width: {visibleStep === i ? '60px' : '30px'};
										background: {visibleStep === i ? 'linear-gradient(to right, ' + (i === 0 ? 'rgb(59, 130, 246), rgb(37, 99, 235)' : i === 1 ? 'rgb(168, 85, 247), rgb(147, 51, 234)' : 'rgb(34, 197, 94), rgb(22, 163, 74)') + ')' : '#e5e7eb'};
									"
								></div>
							{/each}
						</div>
					</div>

					<!-- Container dos passos com posicionamento absoluto -->
					<div class="relative w-full min-h-[400px]">
						{#each steps as step, index}
							<div 
								class="absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-1000 ease-out"
								style="
									opacity: {visibleStep === index ? 1 : 0};
									transform: translateY({visibleStep === index ? 0 : visibleStep > index ? -60 : 60}px) scale({visibleStep === index ? 1 : 0.9});
									filter: blur({visibleStep === index ? 0 : 12}px);
									pointer-events: {visibleStep === index ? 'auto' : 'none'};
								"
							>
								<div class="max-w-2xl space-y-8">
									<!-- Número do passo com animação -->
									<div class="flex justify-center">
										<div 
											class="w-20 h-20 rounded-3xl bg-gradient-to-br {step.color} flex items-center justify-center shadow-2xl transition-transform duration-500"
											style="transform: scale({visibleStep === index ? 1 : 0.8}) rotate({visibleStep === index ? 0 : -10}deg);"
										>
											<span class="text-4xl font-bold text-white">{step.number}</span>
										</div>
									</div>

									<!-- Título -->
									<h3 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
										{step.title}
									</h3>

									<!-- Descrição -->
									<p class="text-xl md:text-2xl text-gray-600 leading-relaxed px-4">
										{step.description}
									</p>

									<!-- Decoração com linha conectora -->
									{#if index < steps.length - 1}
										<div class="flex items-center justify-center gap-3 mt-8">
											<div class="w-12 h-0.5 bg-gradient-to-r {step.color}"></div>
											<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
											</svg>
											<div class="w-12 h-0.5 bg-gradient-to-r {step.color}"></div>
										</div>
									{/if}
								</div>
							</div>
						{/each}
					</div>

					<!-- Indicador de progresso e hint -->
					<div class="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
						<!-- Progress dots -->
						<div class="flex gap-3">
							{#each steps as step, i}
								<div
									class="relative transition-all duration-300"
									style="transform: scale({visibleStep === i ? 1.2 : 1});"
									role="presentation"
								>
									<div 
										class="w-3 h-3 rounded-full transition-all duration-300"
										class:bg-gradient-to-r={visibleStep === i}
										class:{step.color}={visibleStep === i}
										class:bg-gray-300={visibleStep !== i}
									></div>
								</div>
							{/each}
						</div>

						<!-- Scroll hint -->
						{#if scrollProgress < 0.1}
							<div 
								class="transition-opacity duration-1000"
								style="opacity: {1 - scrollProgress * 10};"
							>
								<div class="flex flex-col items-center gap-2 text-gray-400 text-sm">
									<span class="uppercase tracking-wider">Role para ver os passos</span>
									<svg class="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
</div>
