<script lang="ts">
	import Section from '$lib/components/ui/Section.svelte';
</script>

<Section>
	<div class="relative overflow-hidden py-24 md:py-32">
		<!-- Background decorativo -->
		<div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
		
		<!-- Padrão de pontos decorativos -->
		<div class="absolute inset-0 opacity-30" style="background-image: radial-gradient(circle at 2px 2px, rgb(99 102 241 / 0.15) 1px, transparent 0); background-size: 32px 32px;"></div>
		
		<!-- Círculos decorativos animados -->
		<div class="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
		<div class="absolute top-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
		<div class="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
		
		<!-- Conteúdo -->
		<div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Badge superior -->
			<div class="flex justify-center mb-8">
				<span class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-lg border border-blue-100">
					<svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
					</svg>
					<span class="text-sm font-semibold text-blue-900">Desenvolvido com excelência</span>
				</span>
			</div>

			<!-- Título principal com gradiente -->
			<h2 class="text-center text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
				<span class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
					Desenvolvido por
				</span>
			</h2>
			
			<!-- Empresa com destaque -->
			<div class="text-center mb-10">
				<p class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
					Grupo OC - OC Digital
				</p>
				<p class="text-xl md:text-2xl text-gray-600 font-light italic">
					pessoas que inovam
				</p>
			</div>

			<!-- Divisor decorativo -->
			<div class="flex items-center justify-center gap-3 mb-12">
				<div class="h-px w-16 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
				<div class="flex gap-1.5">
					<div class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
					<div class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" style="animation-delay: 0.2s;"></div>
					<div class="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" style="animation-delay: 0.4s;"></div>
				</div>
				<div class="h-px w-16 bg-gradient-to-l from-transparent via-purple-400 to-transparent"></div>
			</div>
			
			<!-- CTA com design moderno -->
			<div class="flex justify-center">
				<a 
					href="https://grupooc.com.br" 
					target="_blank"
					rel="noopener noreferrer"
					class="group relative inline-flex items-center gap-3 px-10 py-5 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-lg shadow-2xl transition-all duration-300 hover:shadow-blue-500/50 hover:scale-105 active:scale-100"
				>
					<!-- Brilho animado no hover -->
					<div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
					
					<span class="relative z-10">Saiba mais sobre Grupo OC</span>
					
					<!-- Ícone com animação -->
					<svg class="relative z-10 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
					</svg>
				</a>
			</div>

			<!-- Features grid -->
			<div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
				<div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-shadow">
					<div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
						<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
						</svg>
					</div>
					<h3 class="font-bold text-gray-900 mb-2">Inovação</h3>
					<p class="text-sm text-gray-600">Tecnologia de ponta em cada projeto</p>
				</div>

				<div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-shadow">
					<div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
						<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
						</svg>
					</div>
					<h3 class="font-bold text-gray-900 mb-2">Qualidade</h3>
					<p class="text-sm text-gray-600">Excelência em cada detalhe</p>
				</div>

				<div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-shadow">
					<div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
						<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
						</svg>
					</div>
					<h3 class="font-bold text-gray-900 mb-2">Pessoas</h3>
					<p class="text-sm text-gray-600">Time dedicado ao seu sucesso</p>
				</div>
			</div>
		</div>
	</div>
</Section>

<style>
	@keyframes blob {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(30px, -50px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
	}

	.animate-blob {
		animation: blob 7s infinite;
	}

	.animation-delay-2000 {
		animation-delay: 2s;
	}

	.animation-delay-4000 {
		animation-delay: 4s;
	}
</style>
