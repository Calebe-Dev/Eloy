<script lang="ts">
	import Section from '../ui/Section.svelte';
	import Container from '../ui/Container.svelte';
	import AnimatedBlock from '../ui/AnimatedBlock.svelte';
	import Button from '../ui/Button.svelte';
</script>

<Section background="gradient">
	<Container>
		<div class="text-center max-w-4xl mx-auto space-y-10">
			<AnimatedBlock>
				<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
					Pronto para conectar sua marca com mais presença?
				</h2>
			</AnimatedBlock>

			<AnimatedBlock delay={200}>
				<p class="text-xl md:text-2xl text-gray-600 leading-relaxed">
					Descubra como Eloi pode transformar seu atendimento.
				</p>
			</AnimatedBlock>

			<AnimatedBlock delay={400}>
				<div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
					<Button variant="primary" size="lg">Fale com Eloi</Button>
					<Button variant="ghost" size="lg">Agendar Conversa com Especialista</Button>
				</div>
			</AnimatedBlock>

			<AnimatedBlock delay={600}>
				<p class="text-sm text-gray-500 pt-4">
					✨ Sem contratos longos • Cancele quando quiser • Setup em 15 minutos
				</p>
			</AnimatedBlock>
		</div>
	</Container>
</Section>
