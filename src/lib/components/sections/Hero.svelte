<script lang="ts">
	import Button from '../ui/Button.svelte';
	import Container from '../ui/Container.svelte';
	import AnimatedBlock from '../ui/AnimatedBlock.svelte';
</script>

<div class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
	<!-- Animated gradient background -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		<!-- Gradient orbs with animation - responsive sizes -->
		<div class="absolute top-1/4 -left-24 sm:-left-32 lg:-left-48 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-400/30 to-cyan-300/20 rounded-full blur-2xl sm:blur-3xl animate-float"></div>
		<div class="absolute bottom-1/4 -right-24 sm:-right-32 lg:-right-48 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-purple-400/30 to-pink-300/20 rounded-full blur-2xl sm:blur-3xl animate-float-delayed"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] bg-gradient-to-br from-indigo-300/10 to-violet-300/10 rounded-full blur-2xl sm:blur-3xl animate-pulse-slow"></div>
		
		<!-- Mesh gradient overlay -->
		<div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white"></div>
	</div>

	<Container size="lg" class="relative z-10 px-4 sm:px-6 lg:px-8">
		<div class="text-center max-w-4xl mx-auto py-12 sm:py-16 lg:py-0">
			<!-- Text content centered -->
			<div class="space-y-6 sm:space-y-7 lg:space-y-8">
				<AnimatedBlock>
					<h1 class="font-bold tracking-tight leading-[1.1] sm:leading-tight">
						<span class="block text-gray-900" style="font-size: clamp(2.5rem, 8vw, 4.5rem);">O que falta para</span>
						<span
							class="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-2 sm:mt-3"
							style="font-size: clamp(2.5rem, 8vw, 4.5rem);"
						>
							um bom atendimento?
						</span>
					</h1>
				</AnimatedBlock>

				<AnimatedBlock delay={200}>
					<p class="font-light text-gray-700 leading-relaxed" style="font-size: clamp(1.125rem, 3vw, 1.5rem);">
						Não é sobre mais pessoas.<br class="hidden sm:block" />
						<span class="sm:inline block mt-1 sm:mt-0">É sobre <span class="font-semibold text-blue-600">mais presença</span>.</span>
					</p>
				</AnimatedBlock>

				<AnimatedBlock delay={400}>
					<p class="text-gray-600 leading-relaxed max-w-2xl mx-auto px-4 sm:px-0" style="font-size: clamp(1rem, 2vw, 1.125rem);">
						Eloi nasceu para representar a voz da sua marca com empatia, constância e propósito.
						Sempre pronto. Sempre coerente. Sempre humano.
					</p>
				</AnimatedBlock>

				<AnimatedBlock delay={600}>
					<div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center pt-2 sm:pt-4 max-w-md sm:max-w-none mx-auto px-4 sm:px-0">
						<Button variant="primary" size="lg" class="w-full sm:w-auto min-h-[48px] sm:min-h-[56px] text-base sm:text-lg">Conheça Eloi</Button>
						<Button variant="secondary" size="lg" class="w-full sm:w-auto min-h-[48px] sm:min-h-[56px] text-base sm:text-lg">Ver demonstração</Button>
					</div>
				</AnimatedBlock>
			</div>
		</div>
	</Container>

	<!-- Scroll indicator - hidden on mobile/tablet, visible on desktop -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block">
		<svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M19 14l-7 7m0 0l-7-7m7 7V3"
			></path>
		</svg>
	</div>
</div>
