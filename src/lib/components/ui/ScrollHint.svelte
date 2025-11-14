<script lang="ts">
	import { onMount } from 'svelte';

	let visible = $state(true);
	let scrolled = $state(false);

	onMount(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				scrolled = true;
				setTimeout(() => {
					visible = false;
				}, 500);
			}
		};

		// Auto-hide após 8 segundos se não rolar
		const autoHideTimer = setTimeout(() => {
			if (!scrolled) {
				visible = false;
			}
		}, 8000);

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
			clearTimeout(autoHideTimer);
		};
	});
</script>

{#if visible}
	<div
		class="fixed left-4 top-4 z-50 animate-bounce-slow"
		class:animate-fade-out={scrolled}
		role="status"
		aria-live="polite"
	>
		<div
			class="flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-white shadow-lg backdrop-blur-sm"
		>
			<svg
				class="h-5 w-5 animate-bounce"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M19 14l-7 7m0 0l-7-7m7 7V3"
				/>
			</svg>
			<span class="text-sm font-medium">Role para explorar</span>
		</div>
	</div>
{/if}

<style>
	@keyframes bounce-slow {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	@keyframes fade-out {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	.animate-bounce-slow {
		animation: bounce-slow 2s ease-in-out infinite;
	}

	.animate-fade-out {
		animation: fade-out 0.5s ease-out forwards;
	}
</style>
