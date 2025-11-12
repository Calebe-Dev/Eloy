<script lang="ts"></script>
	import { onMount } from 'svelte';

	let {
		delay = 0,
		class: className = ''
	}: {
		delay?: number;
		class?: string;
	} = $props();

	let messages = [
		{ text: 'Oi, eu sou Eloi.', delay: 0 },
		{ text: 'Eu aprendo com cada conversa e estou sempre pronto para ajudar seus clientes.', delay: 1000 },
		{ text: 'A qualquer hora e em qualquer lugar.', delay: 2000 },
		{ text: 'Fui projetado para me moldar à coda negócio.', delay: 3000 },
		{
			text: 'Sou totalmente personalizável. Da linguagem ao design, refletindo a essência de cada marca.',
			delay: 4000
		},
		{
			text: 'Então... quando começamos? Estou pronto para transformar a forma como sua marca se conecta às pessoas.',
			delay: 5000
		}
	];

	let visibleMessages = $state<number[]>([]);
	let isTyping = $state(false);

	onMount(() => {
		setTimeout(() => {
			messages.forEach((msg, index) => {
				setTimeout(() => {
					if (index < messages.length - 1) {
						isTyping = true;
					}
					setTimeout(() => {
						visibleMessages = [...visibleMessages, index];
						isTyping = false;
					}, 300);
				}, msg.delay + delay);
			});
		}, 500);
	});
</script>

<div class={`relative ${className}`}>
	<!-- Phone mockup -->
	<div
		class="relative mx-auto w-full max-w-sm bg-white rounded-[3rem] shadow-2xl border-[14px] border-gray-900 overflow-hidden"
		style="aspect-ratio: 9/19.5;"
	>
		<!-- Notch -->
		<div class="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10"></div>

		<!-- Status bar -->
		<div class="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-8 pt-2 text-xs z-20">
			<span class="font-semibold">9:41</span>
			<div class="flex items-center gap-1">
				<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
					<path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
				</svg>
			</div>
		</div>

		<!-- Chat header -->
		<div class="absolute top-12 left-0 right-0 bg-black text-white px-6 py-4 flex items-center gap-3 z-20">
			<div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
				<svg class="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
				</svg>
			</div>
			<div class="flex-1">
				<h3 class="font-semibold">Eloi</h3>
				<p class="text-xs text-gray-400">A voz digital da sua empresa</p>
			</div>
		</div>

		<!-- Chat messages -->
		<div class="h-full pt-32 pb-20 px-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
			<div class="space-y-3">
				{#each visibleMessages as msgIndex}
					<div class="flex items-start gap-2 animate-fade-in-up">
						<div class="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
							<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
							</svg>
						</div>
						<div class="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-200 max-w-[75%]">
							<p class="text-sm text-gray-800 leading-relaxed">{messages[msgIndex].text}</p>
						</div>
					</div>
				{/each}

				{#if isTyping}
					<div class="flex items-start gap-2">
						<div class="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
							<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
							</svg>
						</div>
						<div class="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-200">
							<div class="flex gap-1">
								<div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms;"></div>
								<div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms;"></div>
								<div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms;"></div>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>

		<!-- Input area -->
		<div class="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
			<div class="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
				<input
					type="text"
					placeholder="Digite sua mensagem..."
					class="flex-1 bg-transparent text-sm outline-none"
					disabled
				/>
				<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M14 5l7 7m0 0l-7 7m7-7H3"
					></path>
				</svg>
			</div>
		</div>

		<!-- Star rating -->
		<div class="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 animate-fade-in" style="animation-delay: 6s; animation-fill-mode: forwards;">
			{#each Array(5) as _, i}
				<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
				</svg>
			{/each}
		</div>
	</div>

	<!-- Floating label -->
	<div class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center opacity-0 animate-fade-in" style="animation-delay: 6.5s; animation-fill-mode: forwards;">
		<p class="text-sm text-gray-500">Experimente o futuro do atendimento hoje!</p>
	</div>
</div>

<style>
	@keyframes fade-in-up {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.animate-fade-in-up {
		animation: fade-in-up 0.4s ease-out forwards;
	}

	.animate-fade-in {
		animation: fade-in 0.6s ease-out;
	}
</style>
