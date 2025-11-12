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
		<div class="max-w-3xl mx-auto space-y-12">
			<AnimatedBlock>
				<h2 class="text-4xl md:text-5xl font-bold text-center text-gray-900">
					Perguntas Frequentes
				</h2>
			</AnimatedBlock>

			<div class="space-y-4">
				{#each faqs as faq, i}
					<AnimatedBlock delay={i * 100}>
						<div class="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-shadow hover:shadow-md">
							<button
								onclick={() => toggle(i)}
								class="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
							>
								<span class="text-lg font-semibold text-gray-900">{faq.question}</span>
								<svg
									class={`w-5 h-5 text-gray-500 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
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
							</button>
							{#if openIndex === i}
								<div class="px-6 pb-5 text-gray-600 leading-relaxed">
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
