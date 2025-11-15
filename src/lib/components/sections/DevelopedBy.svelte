<script lang="ts">
	import Section from '$lib/components/ui/Section.svelte';
</script>

<Section>
	<div class="max-w-4xl mx-auto text-center py-16">
		<!-- Título -->
		<h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
			Desenvolvido por
		</h2>
		
		<!-- Texto -->
		<p class="text-xl md:text-2xl text-gray-700 mb-8 font-medium">
			Grupo OC - OC Digital, pessoas que inovam
		</p>
		
		<!-- Botão CTA -->
		<a 
			href="https://grupooc.com.br" 
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
		>
			<span>Saiba mais sobre Grupo OC</span>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
			</svg>
		</a>
		
		<!-- Linha decorativa -->
		<div class="mt-12 flex items-center justify-center gap-4">
			<div class="h-px w-24 bg-gradient-to-r from-transparent to-blue-300"></div>
			<div class="w-2 h-2 rounded-full bg-blue-500"></div>
			<div class="h-px w-24 bg-gradient-to-l from-transparent to-blue-300"></div>
		</div>
	</div>
</Section>

<style>
	/* Animação suave no hover do botão */
	a {
		transform-origin: center;
	}
</style>
