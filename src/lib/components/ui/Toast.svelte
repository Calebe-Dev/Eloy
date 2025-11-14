<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		message: string;
		icon?: Snippet;
		duration?: number;
		position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
		delay?: number;
		persistent?: boolean;
		onClose?: () => void;
	}

	let {
		message,
		icon,
		duration = 5000,
		position = 'top-left',
		delay = 0,
		persistent = false,
		onClose
	}: Props = $props();

	let visible = $state(false);
	let closing = $state(false);

	onMount(() => {
		const showTimer = setTimeout(() => {
			visible = true;
		}, delay);

		let hideTimer: ReturnType<typeof setTimeout>;
		if (!persistent && duration > 0) {
			hideTimer = setTimeout(() => {
				close();
			}, delay + duration);
		}

		return () => {
			clearTimeout(showTimer);
			if (hideTimer) clearTimeout(hideTimer);
		};
	});

	function close() {
		closing = true;
		setTimeout(() => {
			visible = false;
			onClose?.();
		}, 300);
	}

	const positions = {
		'top-left': 'top-4 left-4',
		'top-right': 'top-4 right-4',
		'bottom-left': 'bottom-4 left-4',
		'bottom-right': 'bottom-4 right-4'
	};
</script>

{#if visible}
	<div
		class="fixed z-50 {positions[position]} animate-fade-in"
		class:animate-fade-out={closing}
		role="alert"
		aria-live="polite"
	>
		<div
			class="flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-white shadow-lg backdrop-blur-sm transition-all hover:shadow-xl"
		>
			{#if icon}
				<div class="flex-shrink-0">
					{@render icon()}
				</div>
			{/if}

			<span class="text-sm font-medium">{message}</span>

			{#if !persistent}
				<button
					onclick={close}
					class="ml-2 flex-shrink-0 rounded-full p-1 transition-colors hover:bg-white/20"
					aria-label="Fechar notificação"
				>
					<svg
						class="h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			{/if}
		</div>
	</div>
{/if}

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(-1rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fade-out {
		from {
			opacity: 1;
			transform: translateY(0);
		}
		to {
			opacity: 0;
			transform: translateY(-1rem);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.3s ease-out forwards;
	}

	.animate-fade-out {
		animation: fade-out 0.3s ease-in forwards;
	}
</style>
