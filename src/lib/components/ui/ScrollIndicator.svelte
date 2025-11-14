<script lang="ts">
	import { onMount } from 'svelte';
	
	let visible = $state(true);
	let hasScrolled = $state(false);
	
	onMount(() => {
		const handleScroll = () => {
			const scrolled = window.scrollY > 100;
			if (scrolled && !hasScrolled) {
				hasScrolled = true;
				// Esconde após o primeiro scroll
				setTimeout(() => {
					visible = false;
				}, 300);
			}
		};
		
		window.addEventListener('scroll', handleScroll, { passive: true });
		
		// Auto-hide após 8 segundos se não houver scroll
		const timeout = setTimeout(() => {
			if (!hasScrolled) {
				visible = false;
			}
		}, 8000);
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
			clearTimeout(timeout);
		};
	});
</script>

{#if visible}
	<div 
		class="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-4 animate-fade-in-right"
		role="status"
		aria-live="polite"
		aria-label="Indicador de navegação"
	>
		<!-- Texto vertical -->
		<div class="relative">
			<span 
				class="text-gray-600 text-sm font-semibold tracking-widest uppercase writing-mode-vertical transform rotate-180 select-none"
				style="writing-mode: vertical-rl;"
			>
				Role para explorar
			</span>
		</div>
		
		<!-- Linha animada -->
		<div class="relative h-24 w-px bg-gray-300 overflow-hidden">
			<div class="absolute inset-0 w-full bg-gradient-to-b from-blue-500 via-purple-500 to-transparent animate-scroll-line"></div>
		</div>
		
		<!-- Ícone de scroll animado -->
		<div class="relative">
			<!-- Pulsing ring -->
			<div class="absolute inset-0 animate-ping opacity-30">
				<div class="w-10 h-10 border-2 border-blue-400 rounded-full"></div>
			</div>
			
			<!-- Icon container -->
			<div class="relative w-10 h-10 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full shadow-lg">
				<svg 
					class="w-5 h-5 text-gray-600 animate-bounce-slow" 
					fill="none" 
					stroke="currentColor" 
					viewBox="0 0 24 24"
				>
					<path 
						stroke-linecap="round" 
						stroke-linejoin="round" 
						stroke-width="2.5" 
						d="M19 14l-7 7m0 0l-7-7"
					></path>
				</svg>
			</div>
		</div>
		
		<!-- Mouse scroll icon -->
		<div class="relative mt-2">
			<div class="w-6 h-10 border-2 border-gray-400 rounded-full p-1 bg-white/90 backdrop-blur-sm">
				<div class="w-1 h-2 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full animate-scroll-wheel mx-auto"></div>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes fade-in-right {
		from {
			opacity: 0;
			transform: translateX(20px) translateY(-50%);
		}
		to {
			opacity: 1;
			transform: translateX(0) translateY(-50%);
		}
	}
	
	@keyframes scroll-line {
		0%, 100% {
			transform: translateY(-100%);
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			transform: translateY(100%);
			opacity: 0;
		}
	}
	
	@keyframes scroll-wheel {
		0%, 100% {
			transform: translateY(0);
			opacity: 1;
		}
		50% {
			transform: translateY(8px);
			opacity: 0.5;
		}
	}
	
	@keyframes bounce-slow {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(5px);
		}
	}
	
	.animate-fade-in-right {
		animation: fade-in-right 0.6s ease-out forwards;
	}
	
	.animate-scroll-line {
		animation: scroll-line 2s ease-in-out infinite;
	}
	
	.animate-scroll-wheel {
		animation: scroll-wheel 1.5s ease-in-out infinite;
	}
	
	.animate-bounce-slow {
		animation: bounce-slow 2s ease-in-out infinite;
	}
	
	/* Hide on mobile */
	@media (max-width: 768px) {
		div[role="status"] {
			display: none;
		}
	}
</style>
