<script lang="ts">
	import Section from '../ui/Section.svelte';
	import Container from '../ui/Container.svelte';
	import AnimatedBlock from '../ui/AnimatedBlock.svelte';
</script>

<Section background="dark">
	<Container>
		<AnimatedBlock class="text-center max-w-3xl mx-auto space-y-6">
			<p class="text-xl md:text-2xl text-gray-300 leading-relaxed">
				Seus clientes exigem presença <span class="text-blue-400 font-semibold">24 horas por dia</span>.
			</p>
			<p class="text-xl md:text-2xl text-gray-300 leading-relaxed">
				Sua equipe não consegue estar sempre lá.
			</p>
			<p class="text-2xl md:text-3xl font-semibold text-white pt-4">
				Quando a resposta não vem, <br class="hidden sm:block" />
				<span class="text-red-400">a oportunidade vai embora</span>.
			</p>
		</AnimatedBlock>
	</Container>
</Section>
