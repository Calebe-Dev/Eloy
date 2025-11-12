<script lang="ts">
	import Section from '../ui/Section.svelte';
	import Container from '../ui/Container.svelte';
	import ScrollReveal from '../ui/ScrollReveal.svelte';
	import CounterAnimation from '../ui/CounterAnimation.svelte';
</script>

<Section background="gray" spacing="large">
	<Container>
		<div class="space-y-16 md:space-y-20">
			<ScrollReveal animation="fade-up">
				<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900">
					Números que Falam
				</h2>
				<p class="text-lg md:text-xl text-gray-600 text-center mt-4 max-w-2xl mx-auto">
					Resultados reais de quem já confia no Eloi
				</p>
			</ScrollReveal>

			<div class="grid md:grid-cols-3 gap-8 lg:gap-12">
				<ScrollReveal animation="slide-left" delay={100}>
					<div class="text-center space-y-4 p-8 rounded-3xl bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
						<div class="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							<CounterAnimation target={2} suffix="M+" delay={200} />
						</div>
						<p class="text-xl md:text-2xl font-semibold text-gray-900">conversas processadas</p>
						<p class="text-base text-gray-600">Taxa de satisfação: <span class="font-semibold text-green-600">94%</span></p>
					</div>
				</ScrollReveal>

				<ScrollReveal animation="scale" delay={200}>
					<div class="text-center space-y-4 p-8 rounded-3xl bg-gradient-to-br from-white to-purple-50/30 border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
						<div class="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							<CounterAnimation target={3} suffix="x" delay={300} />
						</div>
						<p class="text-xl md:text-2xl font-semibold text-gray-900">mais leads capturados</p>
						<p class="text-base text-gray-600">Em comparação com atendimento manual</p>
					</div>
				</ScrollReveal>

				<ScrollReveal animation="slide-right" delay={300}>
					<div class="text-center space-y-4 p-8 rounded-3xl bg-gradient-to-br from-white to-green-50/30 border border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
						<div class="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							<CounterAnimation target={340} suffix="%" delay={400} />
						</div>
						<p class="text-xl md:text-2xl font-semibold text-gray-900">de melhoria em eficiência</p>
						<p class="text-base text-gray-600">Redução em tempo de resposta</p>
					</div>
				</ScrollReveal>
			</div>
		</div>
	</Container>
</Section>
