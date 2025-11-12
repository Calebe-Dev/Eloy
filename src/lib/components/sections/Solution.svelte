<script lang="ts">
	import Section from '../ui/Section.svelte';
	import Container from '../ui/Container.svelte';
	import AnimatedBlock from '../ui/AnimatedBlock.svelte';
</script>

<Section background="gradient">
	<Container>
		<div class="text-center max-w-4xl mx-auto space-y-16">
			<AnimatedBlock>
				<h2 class="text-5xl md:text-6xl font-bold text-gray-900">
					Eloi — A voz digital que conecta <br class="hidden md:block" />
					sua marca às pessoas
				</h2>
				<p class="text-xl md:text-2xl text-gray-600 mt-6 font-light">
					Um vendedor que nunca dorme, nunca erra, nunca cansa.
				</p>
			</AnimatedBlock>

			<div class="grid md:grid-cols-3 gap-8 md:gap-12">
				<AnimatedBlock delay={200}>
					<div class="space-y-4">
						<div class="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center">
							<svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
						</div>
						<h3 class="text-2xl font-semibold text-gray-900">Presença Constante</h3>
						<p class="text-gray-600 leading-relaxed">
							Atende 24/7 sem custos operacionais crescentes. Sem faltas. Sem imprevistos.
						</p>
					</div>
				</AnimatedBlock>

				<AnimatedBlock delay={400}>
					<div class="space-y-4">
						<div class="w-16 h-16 mx-auto bg-purple-100 rounded-2xl flex items-center justify-center">
							<svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
							</svg>
						</div>
						<h3 class="text-2xl font-semibold text-gray-900">Humanidade Verdadeira</h3>
						<p class="text-gray-600 leading-relaxed">
							Entende contexto. Responde com empatia. Fala como sua marca.
						</p>
					</div>
				</AnimatedBlock>

				<AnimatedBlock delay={600}>
					<div class="space-y-4">
						<div class="w-16 h-16 mx-auto bg-green-100 rounded-2xl flex items-center justify-center">
							<svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
							</svg>
						</div>
						<h3 class="text-2xl font-semibold text-gray-900">Conversão Inteligente</h3>
						<p class="text-gray-600 leading-relaxed">
							Qualifica leads, sugere soluções, fecha vendas enquanto você dorme.
						</p>
					</div>
				</AnimatedBlock>
			</div>
		</div>
	</Container>
</Section>
