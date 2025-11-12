<script lang="ts">
	import Section from '../ui/Section.svelte';
	import Container from '../ui/Container.svelte';
	import AnimatedBlock from '../ui/AnimatedBlock.svelte';

	const faqs = [
		{
			question: 'Como Eloi entende minha marca?',
			answer:
				'Você configura a essência da sua marca no painel: tom de voz, valores, produtos, estilo. Eloi aprende e evolui a cada interação, mantendo consistência total.'
		},
		{
			question: 'Qual é o tempo de ativação?',
			answer:
				'Menos de 15 minutos. Setup das informações, escolha dos canais, e Eloi já está representando sua marca.'
		},
		{
			question: 'Posso usar em múltiplos canais?',
			answer:
				'Sim. Web, WhatsApp, Facebook Messenger, Instagram. Escolha onde sua marca precisa estar presente.'
		},
		{
			question: 'Como monitoro as conversas?',
			answer:
				'Dashboard completo com transcrições, análises de conversão, funis de vendas, e métricas em tempo real.'
		},
		{
			question: 'E se Eloi não souber responder?',
			answer:
				'Eloi identifica a limitação e oferece transferência para atendimento humano, mantendo todo o contexto.'
		},
		{
			question: 'Posso cancelar quando quiser?',
			answer: 'Sim. Sem contratos longos, sem burocracias. Controle total.'
		}
	];

	let openIndex = $state<number | null>(null);

	function toggle(index: number) {
		openIndex = openIndex === index ? null : index;
	}
</script>

<Section background="transparent">
	<Container size="default">
		<div class="max-w-4xl mx-auto space-y-12 md:space-y-16">
			<AnimatedBlock>
				<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900">
					Perguntas Frequentes
				</h2>
				<p class="text-lg md:text-xl text-gray-600 text-center mt-4">
					Tudo que você precisa saber sobre o Eloi
				</p>
			</AnimatedBlock>

			<div class="space-y-3">
				{#each faqs as faq, i}
					<AnimatedBlock delay={i * 80}>
						<div class="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden transition-all duration-300 hover:border-blue-200 hover:shadow-lg">
							<button
								onclick={() => toggle(i)}
								class="w-full px-6 lg:px-8 py-5 lg:py-6 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
							>
								<span class="text-lg lg:text-xl font-semibold text-gray-900 pr-4">{faq.question}</span>
								<div class={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === i ? 'bg-blue-600 rotate-180' : 'bg-gray-100'}`}>
									<svg
										class={`w-5 h-5 transition-colors ${openIndex === i ? 'text-white' : 'text-gray-600'}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M19 9l-7 7-7-7"
										></path>
									</svg>
								</div>
							</button>
							{#if openIndex === i}
								<div class="px-6 lg:px-8 pb-6 text-gray-600 leading-relaxed text-base lg:text-lg animate-fade-in">
									{faq.answer}
								</div>
							{/if}
						</div>
					</AnimatedBlock>
				{/each}
			</div>
		</div>
	</Container>
</Section>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.3s ease-out;
	}
</style>
