<script lang="ts">
	import Section from '../ui/Section.svelte';
	import Container from '../ui/Container.svelte';
	import AnimatedBlock from '../ui/AnimatedBlock.svelte';
	import Button from '../ui/Button.svelte';
</script>

<Section background="gradient">
	<Container>
		<div class="text-center max-w-3xl mx-auto space-y-8">
			<AnimatedBlock>
				<h2 class="text-4xl md:text-5xl font-bold text-gray-900">
					Pronto para conectar sua marca com mais presença?
				</h2>
			</AnimatedBlock>

			<AnimatedBlock delay={200}>
				<p class="text-xl text-gray-600">
					Descubra como Eloi pode transformar seu atendimento.
				</p>
			</AnimatedBlock>

			<AnimatedBlock delay={400}>
				<div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
					<Button variant="primary" size="lg">Fale com Eloi</Button>
					<Button variant="ghost" size="lg">Agendar Conversa com Especialista</Button>
				</div>
			</AnimatedBlock>
		</div>
	</Container>
</Section>
