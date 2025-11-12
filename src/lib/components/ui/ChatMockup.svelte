<script lang="ts">
	import { onMount } from 'svelte';

	let {
		className = ''
	}: {
		className?: string;
	} = $props();

	let messages = [
		{ text: 'Oi, eu sou Eloi.', id: 1 },
		{
			text: 'Eu aprendo com cada conversa e estou sempre pronto para ajudar seus clientes.',
			id: 2
		},
		{ text: 'A qualquer hora e em qualquer lugar.', id: 3 },
		{ text: 'Fui projetado para me moldar à cada negócio.', id: 4 },
		{
			text: 'Sou totalmente personalizável. Da linguagem ao design, refletindo a essência de cada marca.',
			id: 5
		},
		{
			text: 'Então... quando começamos? Estou pronto para transformar a forma como sua marca se conecta às pessoas.',
			id: 6
		}
	];

	let messageElements: HTMLDivElement[] = [];
	let visibleMessages = $state<Set<number>>(new Set());

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const index = parseInt(entry.target.getAttribute('data-index') || '0');
						visibleMessages = new Set([...visibleMessages, index]);
					}
				});
			},
			{ threshold: 0.3, rootMargin: '-50px' }
		);

		messageElements.forEach((el) => {
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	});
</script>

<div class={`w-full max-w-2xl mx-auto ${className}`}>
	<!-- Chat widget container -->
	<div class="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
		<!-- Chat header -->
		<div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center gap-3">
			<div class="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
				<svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
					<path
						fill-rule="evenodd"
						d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
						clip-rule="evenodd"
					></path>
				</svg>
			</div>
			<div class="flex-1">
				<h3 class="text-white font-semibold text-lg">Eloi</h3>
				<p class="text-blue-100 text-sm">A voz digital da sua empresa</p>
			</div>
			<div class="flex gap-2">
				<button
					class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
				>
					<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"
						></path>
					</svg>
				</button>
				<button
					class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
				>
					<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
			</div>
		</div>

		<!-- Chat messages -->
		<div
			class="p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white min-h-[400px] max-h-[500px] overflow-y-auto"
		>
			{#each messages as message, index}
				<div
					bind:this={messageElements[index]}
					data-index={index}
					class={`flex items-start gap-3 transition-all duration-700 ${
						visibleMessages.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
					}`}
					style={`transition-delay: ${index * 150}ms;`}
				>
					<div
						class="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
					>
						<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
								clip-rule="evenodd"
							></path>
						</svg>
					</div>
					<div
						class="flex-1 bg-white rounded-2xl rounded-tl-sm px-5 py-3 shadow-md border border-gray-100"
					>
						<p class="text-gray-800 leading-relaxed">{message.text}</p>
					</div>
				</div>
			{/each}

			<!-- Typing indicator (shows after last message) -->
			{#if visibleMessages.has(messages.length - 1)}
				<div class="flex items-start gap-3 animate-fade-in">
					<div
						class="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center"
					>
						<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
								clip-rule="evenodd"
							></path>
						</svg>
					</div>
					<div
						class="bg-white rounded-2xl rounded-tl-sm px-5 py-3 shadow-md border border-gray-100"
					>
						<div class="flex gap-1">
							<div
								class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
								style="animation-delay: 0ms;"
							></div>
							<div
								class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
								style="animation-delay: 150ms;"
							></div>
							<div
								class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
								style="animation-delay: 300ms;"
							></div>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Input area -->
		<div class="border-t border-gray-200 p-4 bg-white">
			<div class="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-3">
				<input
					type="text"
					placeholder="Digite sua mensagem..."
					class="flex-1 bg-transparent text-gray-900 placeholder-gray-500 outline-none"
					disabled
				/>
				<button
					class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
				>
					<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						></path>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Rating stars (appear at bottom after scroll) -->
	<div
		class={`flex justify-center gap-1 mt-6 transition-all duration-700 ${
			visibleMessages.has(messages.length - 1)
				? 'opacity-100 translate-y-0'
				: 'opacity-0 translate-y-8'
		}`}
	>
		{#each Array(5) as _, i}
			<svg class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
				<path
					d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
				></path>
			</svg>
		{/each}
	</div>
	<p
		class={`text-center text-gray-600 mt-3 transition-all duration-700 ${
			visibleMessages.has(messages.length - 1)
				? 'opacity-100 translate-y-0'
				: 'opacity-0 translate-y-8'
		}`}
	>
		Experimente o futuro do atendimento hoje!
	</p>
</div>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.animate-fade-in {
		animation: fade-in 0.6s ease-out;
	}
</style>
