<script lang="ts">
	import Button from '../ui/Button.svelte';
	import Container from '../ui/Container.svelte';
	import AnimatedBlock from '../ui/AnimatedBlock.svelte';
	import ChatMockup from '../ui/ChatMockup.svelte';
</script>

<div class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
	<!-- Background decoration -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		<div class="absolute top-1/4 -left-48 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
		<div class="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
	</div>

	<Container size="lg" class="relative z-10">
		<div class="text-center max-w-4xl mx-auto">
			<!-- Text content centered -->
			<div class="space-y-6 lg:space-y-8">
				<AnimatedBlock>
					<h1 class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
						<span class="block text-gray-900">O que falta para</span>
						<span
							class="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-2"
						>
							um bom atendimento?
						</span>
					</h1>
				</AnimatedBlock>

				<AnimatedBlock delay={200}>
					<p class="text-xl md:text-2xl font-light text-gray-700 leading-relaxed">
						Não é sobre mais pessoas.<br />
						É sobre <span class="font-semibold text-blue-600">mais presença</span>.
					</p>
				</AnimatedBlock>

				<AnimatedBlock delay={400}>
					<p class="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
						Eloi nasceu para representar a voz da sua marca com empatia, constância e propósito.
						Sempre pronto. Sempre coerente. Sempre humano.
					</p>
				</AnimatedBlock>

				<AnimatedBlock delay={600}>
					<div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
						<Button variant="primary" size="lg">Conheça Eloi</Button>
						<Button variant="secondary" size="lg">Ver demonstração</Button>
					</div>
				</AnimatedBlock>
			</div>
		</div>
	</Container>

	<!-- Scroll indicator -->
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

<!-- Chat Mockup Section - Separate from Hero -->
<div class="relative bg-white py-20">
	<Container size="lg">
		<ChatMockup />
	</Container>
</div>
