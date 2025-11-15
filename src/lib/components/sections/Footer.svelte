<script lang="ts">
	import Container from '../ui/Container.svelte';

	const whatsappContatoUrl = `/contato?msg=${encodeURIComponent('Olá! Vim através do site e gostaria de mais informações sobre o Eloi.')}`;
</script>

<footer class="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-20 md:py-24 overflow-hidden">
	<!-- Background decorativo -->
	<div class="absolute inset-0 opacity-5">
		<div class="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
	</div>
	
	<!-- Gradiente sutil -->
	<div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

	<Container>
		<div class="relative z-10 space-y-12">
			<!-- Seção principal -->
			<div class="flex flex-col lg:flex-row justify-between items-start gap-12">
				<!-- Logo e descrição -->
				<div class="text-center lg:text-left max-w-md">
					<div class="mb-4">
						<h3 class="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
							Eloi
						</h3>
						<p class="text-xs text-blue-400 font-medium tracking-wider uppercase">
							Vendedor Virtual Inteligente
						</p>
					</div>
					<p class="text-gray-400 leading-relaxed text-base">
						A voz digital da sua marca.<br />
						Construído para empresas que entendem que atendimento é diferencial.
					</p>
				</div>

				<!-- Links -->
				<nav class="flex flex-wrap justify-center lg:justify-end gap-8 text-base">
					<a href="#sobre" class="hover:text-blue-400 transition-all duration-300 hover:underline underline-offset-4 decoration-blue-400">
						Sobre
					</a>
					<a href="#privacidade" class="hover:text-blue-400 transition-all duration-300 hover:underline underline-offset-4 decoration-blue-400">
						Privacidade
					</a>
					<a href="#termos" class="hover:text-blue-400 transition-all duration-300 hover:underline underline-offset-4 decoration-blue-400">
						Termos
					</a>
					<a 
						href={whatsappContatoUrl} 
						class="hover:text-blue-400 transition-all duration-300 hover:underline underline-offset-4 decoration-blue-400"
					>
						Contato
					</a>
				</nav>
			</div>

			<!-- Divider -->
			<div class="relative">
				<div class="absolute inset-0 flex items-center">
					<div class="w-full border-t border-gray-800"></div>
				</div>
				<div class="relative flex justify-center">
					<span class="px-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-600 text-xs font-medium tracking-widest uppercase">
						Tecnologia & Inovação
					</span>
				</div>
			</div>

			<!-- Créditos e copyright -->
			<div class="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
				<!-- Copyright -->
				<div class="text-center md:text-left">
					<p class="text-gray-500 mb-1">
						© 2027 Eloi. Todos os direitos reservados.
					</p>
					<p class="text-gray-600 text-xs">
						Powered by Grupo OC - OC Digital, pessoas que inovam
					</p>
				</div>

				<!-- Créditos OC -->
				<div class="text-center md:text-right">
					<p class="text-gray-400 font-medium mb-1">
						Desenvolvido por 
						<a 
							href="https://grupooc.com.br" 
							target="_blank" 
							rel="noopener noreferrer"
							class="text-blue-400 hover:text-blue-300 transition-colors font-semibold ml-1"
						>
							Grupo OC
						</a>
					</p>
					<p class="text-gray-600 text-xs flex items-center justify-center md:justify-end gap-2">
						<svg class="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
							<path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
						</svg>
						Divisão OC Digital
					</p>
				</div>
			</div>

			<!-- Badges/Features -->
			<div class="flex flex-wrap justify-center gap-4 text-xs text-gray-600 pt-4 border-t border-gray-800">
				<span class="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/50 rounded-full border border-gray-700/50">
					<svg class="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
					</svg>
					Sistema Próprio
				</span>
				<span class="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/50 rounded-full border border-gray-700/50">
					<svg class="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
						<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
						<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
					</svg>
					Suporte Dedicado
				</span>
				<span class="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/50 rounded-full border border-gray-700/50">
					<svg class="w-3.5 h-3.5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path>
					</svg>
					IA Avançada
				</span>
			</div>
		</div>
	</Container>
</footer>
