<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		className?: string;
	}

	let { className = '' }: Props = $props();

	const messages = [
		{ id: 1, text: 'Olá! 👋 Sou o Eloi. Como posso ajudar você hoje?', sender: 'bot' },
		{ id: 2, text: 'Oi! Queria entender melhor como o Eloi funciona', sender: 'user' },
		{
			id: 3,
			text: 'Perfeito! Sou um assistente de IA treinado especialmente para o seu negócio. Posso responder dúvidas, qualificar leads e atender seus clientes 24/7.',
			sender: 'bot'
		},
		{ id: 4, text: 'Interessante! E você aprende com as conversas?', sender: 'user' },
		{
			id: 5,
			text: 'Sim! Cada interação me ajuda a entender melhor o tom da sua marca e as necessidades dos seus clientes. Fico mais inteligente a cada dia! 🧠✨',
			sender: 'bot'
		},
		{ id: 6, text: 'Que incrível! Quero testar 🚀', sender: 'user' }
	];

	let containerElement: HTMLDivElement;
	let visibleMessages = $state<number>(0);
	let scrollProgress = $state(0);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// Calculate scroll progress (0 to 1)
						scrollProgress = Math.min(entry.intersectionRatio * 1.5, 1);
						
						// Show messages progressively based on scroll
						const messagesToShow = Math.ceil(messages.length * scrollProgress);
						visibleMessages = messagesToShow;
					}
				});
			},
			{
				threshold: Array.from({ length: 21 }, (_, i) => i * 0.05), // Track every 5%
				rootMargin: '-10% 0px -10% 0px'
			}
		);

		if (containerElement) {
			observer.observe(containerElement);
		}

		return () => observer.disconnect();
	});
</script>

<div class="w-full max-w-2xl mx-auto {className}" bind:this={containerElement}>
	<!-- Chat Widget Container with dynamic height -->
	<div
		class="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-1000 ease-out relative"
		style="height: {200 + scrollProgress * 500}px;"
	>
		<!-- Chat Header -->
		<div class="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 px-6 py-5 flex items-center justify-between shadow-lg sticky top-0 z-10">
			<div class="flex items-center gap-4">
				<div class="relative">
					<div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md">
						<span class="text-2xl font-black bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
							E
						</span>
					</div>
					<div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
				</div>
				<div>
					<h3 class="text-white font-bold text-lg tracking-tight">Eloi</h3>
					<p class="text-blue-50 text-sm flex items-center gap-1">
						<span class="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
						Online agora
					</p>
				</div>
			</div>
			<div class="flex gap-2">
				<button
					aria-label="Minimizar chat"
					class="w-9 h-9 flex items-center justify-center hover:bg-white/20 rounded-xl transition-all active:scale-95"
				>
					<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path>
					</svg>
				</button>
				<button
					aria-label="Fechar chat"
					class="w-9 h-9 flex items-center justify-center hover:bg-white/20 rounded-xl transition-all active:scale-95"
				>
					<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
			</div>
		</div>

		<!-- Messages Container - Scrollable -->
		<div class="overflow-y-auto bg-gradient-to-b from-gray-50 to-white px-6 py-6 space-y-5" style="height: calc(100% - 160px);">
			{#each messages.slice(0, visibleMessages) as message, index (message.id)}
				<div
					class="message-reveal"
					style="animation-delay: {index * 100}ms;"
				>
					<div class="flex {message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2">
						{#if message.sender === 'bot'}
							<div class="flex gap-3 max-w-[85%]">
								<div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
									<span class="text-white text-sm font-bold">E</span>
								</div>
								<div class="bg-white shadow-lg px-5 py-4 rounded-3xl rounded-tl-md border border-gray-100">
									<p class="text-gray-800 text-[15px] leading-relaxed">{message.text}</p>
								</div>
							</div>
						{:else}
							<div class="max-w-[85%]">
								<div class="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg px-5 py-4 rounded-3xl rounded-tr-md">
									<p class="text-white text-[15px] leading-relaxed font-medium">{message.text}</p>
								</div>
							</div>
						{/if}
					</div>
				</div>
			{/each}

			<!-- Typing indicator - shows when all messages are visible -->
			{#if visibleMessages >= messages.length}
				<div class="flex justify-start typing-indicator">
					<div class="flex gap-3">
						<div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
							<span class="text-white text-sm font-bold">E</span>
						</div>
						<div class="bg-white shadow-lg px-5 py-4 rounded-3xl rounded-tl-md border border-gray-100">
							<div class="flex gap-1.5">
								<div class="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce"></div>
								<div class="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
								<div class="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s;"></div>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Input Area - Fixed at bottom -->
		<div class="absolute bottom-0 left-0 right-0 px-6 py-5 bg-white/95 backdrop-blur-lg border-t border-gray-200">
			<div class="flex gap-3 items-center">
				<input
					type="text"
					placeholder="Digite sua mensagem..."
					class="flex-1 px-5 py-3 bg-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
				/>
				<button
					aria-label="Enviar mensagem"
					class="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
				>
					<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2.5"
							d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
						></path>
					</svg>
				</button>
			</div>
		</div>

		<!-- Scroll indicator hint -->
		{#if scrollProgress < 0.9}
			<div class="absolute bottom-24 left-1/2 -translate-x-1/2 opacity-50 animate-bounce pointer-events-none">
				<svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
				</svg>
			</div>
		{/if}
	</div>
</div>

<style>
	@keyframes slideInUp {
		from {
			opacity: 0;
			transform: translateY(30px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.9);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.message-reveal {
		animation: slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	.typing-indicator {
		animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
	}
</style>
