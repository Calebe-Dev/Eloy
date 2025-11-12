<script lang="ts">
	import Section from '../ui/Section.svelte';
	import Container from '../ui/Container.svelte';
	import AnimatedBlock from '../ui/AnimatedBlock.svelte';
</script>

<Section background="gray">
	<Container>
		<div class="space-y-16">
			<AnimatedBlock>
				<h2 class="text-4xl md:text-5xl font-bold text-center text-gray-900">
					Números que Falam
				</h2>
			</AnimatedBlock>

			<div class="grid md:grid-cols-3 gap-12">
				<AnimatedBlock delay={200}>
					<div class="text-center space-y-3">
						<div class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							2M+
						</div>
						<p class="text-xl text-gray-600">conversas processadas</p>
						<p class="text-sm text-gray-500">Taxa de satisfação: 94%</p>
					</div>
				</AnimatedBlock>

				<AnimatedBlock delay={400}>
					<div class="text-center space-y-3">
						<div class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							3x
						</div>
						<p class="text-xl text-gray-600">mais leads capturados</p>
						<p class="text-sm text-gray-500">Em comparação com atendimento manual</p>
					</div>
				</AnimatedBlock>

				<AnimatedBlock delay={600}>
					<div class="text-center space-y-3">
						<div class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							340%
						</div>
						<p class="text-xl text-gray-600">de melhoria em eficiência</p>
						<p class="text-sm text-gray-500">Redução em tempo de resposta</p>
					</div>
				</AnimatedBlock>
			</div>
		</div>
	</Container>
</Section>
