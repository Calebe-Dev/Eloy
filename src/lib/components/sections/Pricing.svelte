<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '../ui/Button.svelte';

	let sectionElement: HTMLElement;
	let scrollProgress = $state(0);

	const plans = [
		{
			name: 'Essencial',
			price: 199,
			description: 'Para começar sua jornada digital',
			features: [
				'1.000 conversas/mês',
				'1 canal integrado',
				'Análise de desempenho',
				'Suporte por email'
			],
			cta: 'Começar agora',
			color: 'gray',
			recommended: false
		},
		{
			name: 'Profissional',
			price: 499,
			description: 'Para empresas que querem crescer',
			features: [
				'10.000 conversas/mês',
				'3 canais integrados',
				'Análise avançada com relatórios',
				'Suporte prioritário',
				'Treinamento personalizado'
			],
			cta: 'Começar agora',
			color: 'blue',
			recommended: true
		},
		{
			name: 'Enterprise',
			price: null,
			description: 'Soluções personalizadas para grandes empresas',
			features: [
				'Conversas ilimitadas',
				'Integração com CRM',
				'Suporte dedicado 24/7',
				'Customizações avançadas',
				'SLA garantido'
			],
			cta: 'Falar com vendas',
			color: 'gray',
			recommended: false
		}
	];

	onMount(() => {
		const handleScroll = () => {
			if (!sectionElement) return;
			
			const rect = sectionElement.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			
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

<section class="relative py-24 md:py-32 lg:py-40 bg-white overflow-hidden">
	<!-- Background minimalista -->
	<div class="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50"></div>
	
	<!-- Grid de fundo sutil -->
	<div class="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

	<div bind:this={sectionElement} class="relative max-w-7xl mx-auto px-6">
		<!-- Header -->
		<div 
			class="text-center mb-16 md:mb-24 transition-all duration-1000 ease-out"
			style="
				opacity: {Math.min(1, scrollProgress * 3)};
				transform: translateY({Math.max(0, 30 - scrollProgress * 40)}px);
			"
		>
			<h2 class="text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 tracking-tight">
				Investimento
			</h2>
			<p class="text-xl md:text-2xl text-gray-500 font-light max-w-2xl mx-auto">
				Escolha o plano ideal para transformar seu atendimento
			</p>
		</div>

		<!-- Cards Grid -->
		<div class="grid lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
			{#each plans as plan, index}
				<div 
					class="relative transition-all duration-1000 ease-out"
					style="
						opacity: {Math.min(1, Math.max(0, (scrollProgress - index * 0.05) * 3))};
						transform: translateY({Math.max(0, 40 - scrollProgress * 60)}px);
					"
				>
					<!-- Card -->
					<div 
						class="relative h-full rounded-[2.5rem] transition-all duration-500 group"
						class:bg-gradient-to-br={plan.recommended}
						class:from-blue-600={plan.recommended}
						class:via-blue-700={plan.recommended}
						class:to-purple-700={plan.recommended}
						class:bg-white={!plan.recommended}
						class:border={!plan.recommended}
						class:border-gray-200={!plan.recommended}
						class:hover:shadow-2xl={true}
						class:hover:scale-[1.02]={!plan.recommended}
						class:shadow-2xl={plan.recommended}
						class:scale-105={plan.recommended}
					>
						<!-- Badge Recomendado -->
						{#if plan.recommended}
							<div class="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
								<div class="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-5 py-2 rounded-full text-sm font-semibold shadow-lg">
									Recomendado
								</div>
							</div>
						{/if}

						<div class="p-8 md:p-10 h-full flex flex-col">
							<!-- Header do card -->
							<div class="mb-8">
								<h3 
									class="text-2xl md:text-3xl font-semibold mb-2"
									class:text-white={plan.recommended}
									class:text-gray-900={!plan.recommended}
								>
									{plan.name}
								</h3>
								<p 
									class="text-base font-light"
									class:text-blue-100={plan.recommended}
									class:text-gray-500={!plan.recommended}
								>
									{plan.description}
								</p>
							</div>

							<!-- Preço -->
							<div class="mb-8">
								{#if plan.price}
									<div class="flex items-baseline gap-1">
										<span 
											class="text-sm font-medium"
											class:text-blue-100={plan.recommended}
											class:text-gray-500={!plan.recommended}
										>
											R$
										</span>
										<span 
											class="text-6xl md:text-7xl font-semibold tracking-tight"
											class:text-white={plan.recommended}
											class:text-gray-900={!plan.recommended}
										>
											{plan.price}
										</span>
										<span 
											class="text-lg font-light"
											class:text-blue-100={plan.recommended}
											class:text-gray-500={!plan.recommended}
										>
											/mês
										</span>
									</div>
								{:else}
									<div>
										<span 
											class="text-4xl md:text-5xl font-semibold"
											class:text-white={plan.recommended}
											class:text-gray-900={!plan.recommended}
										>
											Sob cotação
										</span>
									</div>
								{/if}
							</div>

							<!-- Features -->
							<ul class="space-y-4 mb-8 flex-1">
								{#each plan.features as feature}
									<li class="flex items-start gap-3">
										<svg 
											class="w-5 h-5 mt-0.5 flex-shrink-0" 
											class:text-blue-200={plan.recommended}
											class:text-green-500={!plan.recommended}
											fill="currentColor" 
											viewBox="0 0 20 20"
										>
											<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
										</svg>
										<span 
											class="text-base leading-relaxed"
											class:text-white={plan.recommended}
											class:text-gray-600={!plan.recommended}
										>
											{feature}
										</span>
									</li>
								{/each}
							</ul>

							<!-- CTA Button -->
							<div class="mt-auto">
								{#if plan.recommended}
									<button 
										class="w-full bg-white text-blue-600 hover:bg-gray-50 font-medium py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
									>
										{plan.cta}
									</button>
								{:else}
									<button 
										class="w-full bg-gray-900 text-white hover:bg-gray-800 font-medium py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95"
									>
										{plan.cta}
									</button>
								{/if}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Footer text -->
		<div 
			class="text-center mt-16 md:mt-20 transition-all duration-1000 ease-out"
			style="
				opacity: {Math.min(1, Math.max(0, (scrollProgress - 0.3) * 3))};
			"
		>
			<p class="text-gray-500 font-light text-lg">
				Todos os planos incluem 14 dias de teste gratuito. Sem cartão de crédito necessário.
			</p>
		</div>
	</div>
</section>
