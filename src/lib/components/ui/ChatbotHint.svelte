<script lang="ts">
	import { onMount } from 'svelte';
	import { chatbotReady } from '$lib/stores/chatbot';

	interface Props {
		duration?: number;
	}

	let { duration = 6000 }: Props = $props();

	let visible = $state(false);
	let closing = $state(false);
	let hideTimer: ReturnType<typeof setTimeout>;
	let hasShown = $state(false); // Previne mostrar múltiplas vezes

	// Observa quando o chatbot fica pronto
	$effect(() => {
		// Só mostra hint se chatbot ficou pronto naturalmente (não via botão) e ainda não mostrou
		if ($chatbotReady && !visible && !hasShown) {
			// Aguarda 1 segundo após o chatbot aparecer para mostrar o hint
			setTimeout(() => {
				if (!hasShown) { // Verificação dupla
					hasShown = true;
					visible = true;
					// Agenda o fechamento
					hideTimer = setTimeout(() => {
						closing = true;
						setTimeout(() => {
							visible = false;
						}, 300);
					}, duration);
				}
			}, 1000);
		}
	});

	onMount(() => {
		return () => {
			if (hideTimer) clearTimeout(hideTimer);
		};
	});

	function close() {
		closing = true;
		setTimeout(() => {
			visible = false;
		}, 300);
	}
</script>

{#if visible}
	<div
		class="fixed right-4 top-20 z-50 animate-fade-in"
		class:animate-fade-out={closing}
		role="alert"
		aria-live="polite"
	>
		<div
			class="flex items-center gap-3 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-white shadow-lg backdrop-blur-sm transition-all hover:shadow-xl"
		>
			<svg
				class="h-5 w-5 animate-pulse"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
				/>
			</svg>
			<span class="text-sm font-medium">💬 Chatbot disponível! Clique para conversar</span>
			<button
				onclick={close}
				class="ml-2 flex-shrink-0 rounded-full p-1 transition-colors hover:bg-white/20"
				aria-label="Fechar notificação"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
	</div>
{/if}

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateX(2rem);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes fade-out {
		from {
			opacity: 1;
			transform: translateX(0);
		}
		to {
			opacity: 0;
			transform: translateX(2rem);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.4s ease-out forwards;
	}

	.animate-fade-out {
		animation: fade-out 0.4s ease-in forwards;
	}
</style>
