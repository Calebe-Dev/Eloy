<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '../ui/Button.svelte';

	let sectionElement: HTMLElement;
	let scrollProgress = $state(0);

	function getWhatsAppUrl(mensagem: string): string {
		return `/contato?msg=${encodeURIComponent(mensagem)}`;
	}

	const plans = [
		{
			name: 'Básico',
			price: 499,
			description: 'Perfeito para começar',
			features: [
				'GPT-3.5 Turbo',
				'Chatbot personalizado',
				'Até 50 interações/mês',
				'Base de conhecimento',
				'Coleta de dados de leads',
				'Redirecionamento WhatsApp/Email',
				'Suporte completo por 3 meses'
			],
			extras: '+50 interações: R$ 59,90',
			cta: 'Começar agora',
			color: 'white',
			recommended: false
		},
		{
			name: 'Profissional',
			price: 699,
			description: 'Para empresas em crescimento',
			features: [
				'GPT-4 Mini',
				'Tudo do Básico +',
				'Até 250 interações/mês',
				'Dashboard Analytics avançado',
				'Qualificação inteligente de leads',
				'Pontuação automática de leads',
				'Suporte prioritário por 6 meses'
			],
			cta: 'Começar agora',
			color: 'gradient',
			recommended: true
		},
		{
			name: 'Empresarial',
			price: 999,
			description: 'Poder e controle total',
			features: [
				'GPT-4',
				'Tudo do Profissional +',
				'Até 1.000 interações/mês',
				'Integração com CRM',
				'Relatórios personalizados',
				'Suporte 24/7',
				'Consultoria mensal especializada'
			],
			cta: 'Começar agora',
			color: 'purple',
			recommended: false
		},
		{
			name: 'Premium',
			price: 1499,
			description: 'Solução completa empresarial',
			features: [
				'Tudo do Empresarial +',
				'Até 1.200 interações/mês',
				'Até 4 atendentes WhatsApp integrados',
				'Plataforma BI completa (Auri)',
				'Dashboard empresarial total',
				'Analytics avançado de interações',
				'Gestão empresarial integrada'
			],
			cta: 'Começar agora',
			color: 'dark',
			recommended: false
		},
		{
			name: 'Personalizado',
			price: null,
			description: 'Solução sob medida',
			features: [
				'Desenvolvimento customizado',
				'Integrações específicas',
				'Escalabilidade ilimitada',
				'Arquitetura personalizada',
				'Equipe dedicada',
				'SLA garantido',
				'Consultoria estratégica'
			],
			cta: 'Solicitar cotação',
			color: 'gradient-premium',
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
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
			{#each plans as plan, index}
				<div 
					class="relative transition-all duration-1000 ease-out {plan.name === 'Personalizado' ? 'md:col-span-2 lg:col-span-1' : ''}"
					style="
						opacity: {Math.min(1, Math.max(0, (scrollProgress - index * 0.05) * 3))};
						transform: translateY({Math.max(0, 40 - scrollProgress * 60)}px);
					"
				>
					<!-- Card -->
					<div 
						class="relative h-full rounded-[2.5rem] transition-all duration-500 group hover:shadow-2xl
							{plan.recommended || plan.color === 'gradient' ? 'bg-gradient-to-br shadow-2xl scale-[1.03]' : ''}
							{plan.recommended ? 'from-blue-600 via-blue-700 to-purple-700' : ''}
							{plan.color === 'purple' ? 'bg-gradient-to-br from-purple-600 to-pink-600' : ''}
							{plan.color === 'gradient-premium' ? 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-2xl' : ''}
							{plan.color === 'dark' ? 'bg-gray-900' : ''}
							{!plan.recommended && plan.color !== 'gradient' && plan.color !== 'dark' && plan.color !== 'purple' && plan.color !== 'gradient-premium' 
								? 'bg-white border border-gray-200' : ''}
							{!plan.recommended ? 'hover:scale-[1.02]' : ''}"
					>
						<!-- Badge Recomendado -->
						{#if plan.recommended}
							<div class="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
								<div class="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-5 py-2 rounded-full text-sm font-semibold shadow-lg">
									Mais escolhido
								</div>
							</div>
						{/if}

						<div class="p-8 md:p-10 h-full flex flex-col">
							<!-- Header do card -->
							<div class="mb-8">
								<h3 
									class="text-2xl md:text-3xl font-semibold mb-2
										{plan.recommended || plan.color === 'gradient' || plan.color === 'purple' || plan.color === 'dark' || plan.color === 'gradient-premium' ? 'text-white' : 'text-gray-900'}"
								>
									{plan.name}
								</h3>
								<p 
									class="text-base font-light
										{plan.recommended || plan.color === 'gradient' || plan.color === 'purple' || plan.color === 'dark' || plan.color === 'gradient-premium' ? 'text-blue-100' : 'text-gray-500'}"
								>
									{plan.description}
								</p>
							</div>

							<!-- Preço -->
							<div class="mb-8">
								{#if plan.price}
									<div class="flex items-baseline gap-1">
										<span 
											class="text-sm font-medium
												{plan.recommended || plan.color === 'gradient' || plan.color === 'purple' || plan.color === 'dark' || plan.color === 'gradient-premium' ? 'text-blue-100' : 'text-gray-500'}"
										>
											R$
										</span>
										<span 
											class="text-6xl md:text-7xl font-semibold tracking-tight
												{plan.recommended || plan.color === 'gradient' || plan.color === 'purple' || plan.color === 'dark' || plan.color === 'gradient-premium' ? 'text-white' : 'text-gray-900'}"
										>
											{plan.price}
										</span>
										<span 
											class="text-lg font-light
												{plan.recommended || plan.color === 'gradient' || plan.color === 'purple' || plan.color === 'dark' || plan.color === 'gradient-premium' ? 'text-blue-100' : 'text-gray-500'}"
										>
											/mês
										</span>
									</div>
									{#if plan.extras}
										<p class="text-sm mt-2 {plan.recommended || plan.color === 'gradient' || plan.color === 'purple' || plan.color === 'dark' || plan.color === 'gradient-premium' ? 'text-blue-200' : 'text-gray-400'}">
											{plan.extras}
										</p>
									{/if}
								{:else}
									<div>
										<span 
											class="text-4xl md:text-5xl font-semibold
												{plan.color === 'gradient-premium' ? 'text-white' : 'text-gray-900'}"
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
											class="w-5 h-5 mt-0.5 flex-shrink-0
												{plan.recommended || plan.color === 'gradient' || plan.color === 'purple' || plan.color === 'dark' || plan.color === 'gradient-premium' ? 'text-blue-200' : 'text-green-500'}" 
											fill="currentColor" 
											viewBox="0 0 20 20"
										>
											<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
										</svg>
										<span 
											class="text-base leading-relaxed
												{plan.recommended || plan.color === 'gradient' || plan.color === 'purple' || plan.color === 'dark' || plan.color === 'gradient-premium' ? 'text-white' : 'text-gray-600'}"
										>
											{feature}
										</span>
									</li>
								{/each}
							</ul>

							<!-- CTA Button -->
							<div class="mt-auto">
								{#if plan.recommended || plan.color === 'gradient' || plan.color === 'purple' || plan.color === 'dark' || plan.color === 'gradient-premium'}
									<a
										href={getWhatsAppUrl(`Olá! Tenho interesse no plano ${plan.name} do Eloi (R$ ${plan.price || 'sob cotação'}/mês). Gostaria de mais informações.`)}
										class="w-full inline-flex items-center justify-center bg-white text-blue-600 hover:bg-gray-50 font-medium py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
									>
										{plan.cta}
									</a>
								{:else}
									<a
										href={getWhatsAppUrl(`Olá! Tenho interesse no plano ${plan.name} do Eloi (R$ ${plan.price || 'sob cotação'}/mês). Gostaria de mais informações.`)}
										class="w-full inline-flex items-center justify-center bg-gray-900 text-white hover:bg-gray-800 font-medium py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95"
									>
										{plan.cta}
									</a>
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
			<p class="text-gray-500 font-light text-lg max-w-3xl mx-auto">
				Configuração completa incluída em todos os planos. Entrega em até 15 dias úteis.
				Sistema próprio sem dependência de terceiros.
			</p>
		</div>
	</div>
</section>
