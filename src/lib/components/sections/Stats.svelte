<script lang="ts">
	import Section from '../ui/Section.svelte';
	import Container from '../ui/Container.svelte';
	import AnimatedBlock from '../ui/AnimatedBlock.svelte';
</script>

<Section background="gray">
	<Container>
		<div class="space-y-12 md:space-y-20">
			<AnimatedBlock>
				<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900">
					Números que Falam
				</h2>
				<p class="text-lg md:text-xl text-gray-600 text-center mt-4 max-w-2xl mx-auto">
					Resultados reais de quem já confia no Eloi
				</p>
			</AnimatedBlock>

			<div class="grid md:grid-cols-3 gap-8 lg:gap-12">
				<AnimatedBlock delay={200}>
					<div class="text-center space-y-4 p-8 rounded-3xl bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
						<div class="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							2M+
						</div>
						<p class="text-xl md:text-2xl font-semibold text-gray-900">conversas processadas</p>
						<p class="text-base text-gray-600">Taxa de satisfação: <span class="font-semibold text-green-600">94%</span></p>
					</div>
				</AnimatedBlock>

				<AnimatedBlock delay={400}>
					<div class="text-center space-y-4 p-8 rounded-3xl bg-gradient-to-br from-white to-purple-50/30 border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
						<div class="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							3x
						</div>
						<p class="text-xl md:text-2xl font-semibold text-gray-900">mais leads capturados</p>
						<p class="text-base text-gray-600">Em comparação com atendimento manual</p>
					</div>
				</AnimatedBlock>

				<AnimatedBlock delay={600}>
					<div class="text-center space-y-4 p-8 rounded-3xl bg-gradient-to-br from-white to-green-50/30 border border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
						<div class="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							340%
						</div>
						<p class="text-xl md:text-2xl font-semibold text-gray-900">de melhoria em eficiência</p>
						<p class="text-base text-gray-600">Redução em tempo de resposta</p>
					</div>
				</AnimatedBlock>
			</div>
		</div>
	</Container>
</Section>
