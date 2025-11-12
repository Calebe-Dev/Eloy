<script lang="ts">
	import Container from '../ui/Container.svelte';
</script>

<footer class="bg-gray-900 text-gray-300 py-12">
	<Container>
		<div class="space-y-8">
			<div class="flex flex-col md:flex-row justify-between items-center gap-6">
				<div class="text-center md:text-left">
					<h3 class="text-2xl font-bold text-white mb-2">Eloi</h3>
					<p class="text-gray-400 text-sm max-w-md">
						A voz digital da sua marca.<br />
						Construído para marcas que entendem que atendimento é diferencial.
					</p>
				</div>

				<nav class="flex gap-6 text-sm">
					<a href="#sobre" class="hover:text-white transition-colors">Sobre</a>
					<a href="#privacidade" class="hover:text-white transition-colors">Privacidade</a>
					<a href="#termos" class="hover:text-white transition-colors">Termos</a>
					<a href="#contato" class="hover:text-white transition-colors">Contato</a>
				</nav>
			</div>

			<div class="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
				<p>© 2024 Eloi. Todos os direitos reservados.</p>
			</div>
		</div>
	</Container>
</footer>
