<script lang="ts">
	import Section from '../ui/Section.svelte';
	import Container from '../ui/Container.svelte';
	import AnimatedBlock from '../ui/AnimatedBlock.svelte';
</script>

<Section background="gray">
	<Container>
		<div class="max-w-5xl mx-auto space-y-20">
			<AnimatedBlock>
				<h2 class="text-4xl md:text-5xl font-bold text-center text-gray-900">Como Funciona</h2>
			</AnimatedBlock>

			<div class="grid md:grid-cols-3 gap-12">
				<AnimatedBlock delay={200}>
					<div class="space-y-4">
						<div class="text-blue-600 text-5xl font-bold">01</div>
						<h3 class="text-2xl font-semibold text-gray-900">Configuração Simples</h3>
						<p class="text-gray-600 leading-relaxed">
							Você define a personalidade, produtos e tom de voz do Eloi. Pronto. Começa a trabalhar em minutos.
						</p>
					</div>
				</AnimatedBlock>

				<AnimatedBlock delay={400}>
					<div class="space-y-4">
						<div class="text-purple-600 text-5xl font-bold">02</div>
						<h3 class="text-2xl font-semibold text-gray-900">Aprendizado Contínuo</h3>
						<p class="text-gray-600 leading-relaxed">
							Cada conversa melhora a próxima. Eloi se adapta, refina, evolui.
						</p>
					</div>
				</AnimatedBlock>

				<AnimatedBlock delay={600}>
					<div class="space-y-4">
						<div class="text-green-600 text-5xl font-bold">03</div>
						<h3 class="text-2xl font-semibold text-gray-900">Integração Total</h3>
						<p class="text-gray-600 leading-relaxed">
							Web, WhatsApp, Facebook, Instagram. Escolha seus canais. Eloi está lá.
						</p>
					</div>
				</AnimatedBlock>
			</div>
		</div>
	</Container>
</Section>
