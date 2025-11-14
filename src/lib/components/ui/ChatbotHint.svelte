<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		delay?: number;
		duration?: number;
	}

	let { delay = 3000, duration = 6000 }: Props = $props();

	let visible = $state(false);
	let closing = $state(false);

	onMount(() => {
		const showTimer = setTimeout(() => {
			visible = true;
		}, delay);

		const hideTimer = setTimeout(() => {
			closing = true;
			setTimeout(() => {
				visible = false;
			}, 300);
		}, delay + duration);

		return () => {
			clearTimeout(showTimer);
			clearTimeout(hideTimer);
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
		class="fixed left-4 top-4 z-50 animate-fade-in"
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
			transform: translateX(-2rem);
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
			transform: translateX(-2rem);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.4s ease-out forwards;
	}

	.animate-fade-out {
		animation: fade-out 0.4s ease-in forwards;
	}
</style>
