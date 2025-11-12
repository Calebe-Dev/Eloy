<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		className?: string;
	}

	let { className = '' }: Props = $props();

	const messages = [
		{ id: 1, text: 'Oi, eu sou Eloi.' },
		{
			id: 2,
			text: 'Eu aprendo com cada conversa e estou sempre pronto para ajudar seus clientes.'
		},
		{ id: 3, text: 'A qualquer hora e em qualquer lugar.' },
		{ id: 4, text: 'Fui projetado para me moldar a cada negócio.' },
		{
			id: 5,
			text: 'Sou totalmente personalizável. Da linguagem ao design, refletindo a essência de cada marca.'
		},
		{
			id: 6,
			text: 'Então... quando começamos? Estou pronto para transformar a forma como sua marca se conecta às pessoas.'
		}
	];

	let visibleCount = $state(0);
	let pinWrapper: HTMLDivElement;
	let scrollProgress = $state(0);

	onMount(() => {
		const recalc = () => {
			if (!pinWrapper) return;
			const viewportCenter = window.innerHeight / 2;
			const rect = pinWrapper.getBoundingClientRect();
			// Get document-relative values
			const docTop = window.scrollY + rect.top;
			const docBottom = docTop + rect.height;
			const centerDocY = window.scrollY + viewportCenter;

			// Start/end when the section is centered (sticky range)
			const start = docTop + viewportCenter; // when the top reaches center line
			const end = docBottom - viewportCenter; // when the bottom leaves center line
			const total = Math.max(end - start, 1);
			const passed = Math.min(Math.max(centerDocY - start, 0), total);
			const progress = passed / total; // 0..1 while pinned
			scrollProgress = progress;

			// Map progress to number of visible messages
			const count = Math.min(messages.length, Math.max(1, Math.floor(progress * (messages.length + 0.0001)) + 1));
			visibleCount = count;
		};

		recalc();
		window.addEventListener('scroll', recalc, { passive: true } as AddEventListenerOptions);
		window.addEventListener('resize', recalc);
		return () => {
			window.removeEventListener('scroll', recalc as EventListener);
			window.removeEventListener('resize', recalc as EventListener);
		};
	});
</script>

<div class="w-full {className}">
	<!-- Pin wrapper: controls how long the mockup stays centered -->
	<div bind:this={pinWrapper} class="relative" style={`height: ${messages.length * 90}vh`}>
		<!-- Mobile Mockup Container (sticky, centered only within this wrapper) -->
		<div
			class="sticky mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl"
			style="width: 340px; box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.1); top: calc(50vh - 310px);"
		>
		<!-- Header - Preto com avatar de perfil -->
		<div class="bg-black px-4 py-5 flex items-center" style="height: 90px;">
			<div class="flex items-center gap-3">
				<!-- Avatar circular branco com ícone de perfil -->
				<div class="w-11 h-11 bg-white rounded-full flex items-center justify-center">
					<svg class="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
					</svg>
				</div>
				<div>
					<h3 class="text-white font-bold text-base">Eloi</h3>
					<p class="text-gray-400 text-xs">A voz digital da sua empresa</p>
				</div>
			</div>
		</div>

		<!-- Messages Area - compact stack; reveal by scroll progress -->
		<div class="bg-white px-4 py-6 space-y-4">
			{#each messages as message, index (message.id)}
				<div class="w-full transition-all duration-700 ease-out {index < visibleCount ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}">
					<div class="flex items-start gap-2">
						<!-- Avatar miniatura circular preto -->
						<div class="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
							<span class="text-white text-xs font-bold">E</span>
						</div>
						<!-- Bolha de mensagem cinza -->
						<div class="bg-gray-100 px-4 py-3 rounded-2xl max-w-[85%]">
							<p class="text-gray-800 text-[13px] leading-relaxed">{message.text}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Input Field -->
		<div class="bg-white px-4 pb-5 pt-3">
			<div class="relative">
				<input
					type="text"
					placeholder="Digite sua mensagem....."
					class="w-full px-5 py-3.5 bg-white border border-gray-300 rounded-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
					style="height: 50px;"
				/>
			</div>
		</div>
		</div>
		
		<!-- Apple-style Progress Indicator (all dots) -->
		<div class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-gray-900/60 backdrop-blur-xl px-5 py-3 rounded-full shadow-lg">
			{#each messages as _, index}
				<div 
					class="w-2 h-2 rounded-full transition-all duration-500"
					class:bg-white={index < visibleCount}
					class:bg-gray-500={index >= visibleCount}
				></div>
			{/each}
		</div>
	</div>
</div>

<style>
	/* Smooth scroll behavior */
	:global(html) {
		scroll-behavior: smooth;
	}
</style>

