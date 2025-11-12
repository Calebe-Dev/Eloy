<script lang="ts">
	import Section from '../ui/Section.svelte';
	import Container from '../ui/Container.svelte';
	import ScrollReveal from '../ui/ScrollReveal.svelte';
</script>

<Section background="dark" class="relative overflow-hidden">
	<!-- Elementos decorativos com parallax -->
	<div class="absolute inset-0 pointer-events-none">
		<ScrollReveal animation="parallax" once={false}>
			<div class="absolute top-1/4 -left-32 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
		</ScrollReveal>
		<ScrollReveal animation="parallax" once={false}>
			<div class="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
		</ScrollReveal>
	</div>

	<Container>
		<div class="text-center max-w-4xl mx-auto space-y-12">
			<ScrollReveal animation="fade-up" delay={0}>
				<p class="text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed">
					Seus clientes exigem presença <span class="text-blue-400 font-semibold">24 horas por dia</span>.
				</p>
			</ScrollReveal>

			<ScrollReveal animation="fade-up" delay={200}>
				<p class="text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed">
					Sua equipe não consegue estar sempre lá.
				</p>
			</ScrollReveal>

			<ScrollReveal animation="scale" delay={400}>
				<div class="pt-6">
					<p class="text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-tight">
						Quando a resposta não vem, <br class="hidden sm:block" />
						<span class="text-red-400">a oportunidade vai embora</span>.
					</p>
				</div>
			</ScrollReveal>
		</div>
	</Container>
</Section>
