<script lang="ts">
	import Container from '../ui/Container.svelte';
</script>

<footer class="bg-gray-900 text-gray-300 py-16 md:py-20">
	<Container>
		<div class="space-y-12">
			<div class="flex flex-col md:flex-row justify-between items-center gap-8">
				<div class="text-center md:text-left max-w-md">
					<h3 class="text-3xl font-bold text-white mb-3">Eloi</h3>
					<p class="text-gray-400 leading-relaxed">
						A voz digital da sua marca.<br />
						Construído para marcas que entendem que atendimento é diferencial.
					</p>
				</div>

				<nav class="flex flex-wrap justify-center gap-8 text-base">
					<a href="#sobre" class="hover:text-white transition-colors hover:underline underline-offset-4">Sobre</a>
					<a href="#privacidade" class="hover:text-white transition-colors hover:underline underline-offset-4">Privacidade</a>
					<a href="#termos" class="hover:text-white transition-colors hover:underline underline-offset-4">Termos</a>
					<a href="#contato" class="hover:text-white transition-colors hover:underline underline-offset-4">Contato</a>
				</nav>
			</div>

			<div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
				<p>© 2024 Eloi. Todos os direitos reservados.</p>
				<p class="flex items-center gap-2">
					Feito com <span class="text-red-500">❤️</span> para transformar atendimentos
				</p>
			</div>
		</div>
	</Container>
</footer>
