<script lang="ts">
	import { onMount } from 'svelte';
	
	let show = $state(false);
	let dismissed = $state(false);
	
	export let delay: number = 1000; // Delay antes de mostrar
	export let duration: number = 5000; // Tempo que fica visível
	
	onMount(() => {
		// Mostra a notificação após o delay
		const showTimeout = setTimeout(() => {
			show = true;
		}, delay);
		
		// Auto-hide após o duration
		const hideTimeout = setTimeout(() => {
			if (!dismissed) {
				show = false;
			}
		}, delay + duration);
		
		return () => {
			clearTimeout(showTimeout);
			clearTimeout(hideTimeout);
		};
	});
	
	function dismiss() {
		dismissed = true;
		show = false;
	}
</script>

{#if show && !dismissed}
	<div 
		class="fixed bottom-6 right-6 z-50 max-w-sm animate-slide-in-right"
		role="alert"
		aria-live="polite"
	>
		<div class="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
			<!-- Gradient accent bar -->
			<div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
			
			<!-- Content -->
			<div class="p-5 pt-6">
				<div class="flex items-start gap-4">
					<!-- Icon -->
					<div class="flex-shrink-0">
						<div class="relative">
							<!-- Pulsing ring -->
							<div class="absolute inset-0 animate-ping opacity-40">
								<div class="w-12 h-12 bg-blue-400 rounded-full"></div>
							</div>
							
							<!-- Icon container -->
							<div class="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
								<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
								</svg>
							</div>
						</div>
					</div>
					
					<!-- Text content -->
					<div class="flex-1 min-w-0">
						<div class="flex items-start justify-between gap-2">
							<div>
								<h3 class="text-gray-900 font-bold text-lg mb-1">
									💬 Olá! Sou Eloi
								</h3>
								<p class="text-gray-600 text-sm leading-relaxed">
									Clique no ícone do chat para conversar comigo e tirar suas dúvidas!
								</p>
							</div>
							
							<!-- Close button -->
							<button 
								onclick={dismiss}
								class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
								aria-label="Fechar notificação"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
								</svg>
							</button>
						</div>
						
						<!-- Action hint -->
						<div class="mt-3 flex items-center gap-2 text-blue-600 text-sm font-semibold">
							<svg class="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
							</svg>
							<span>Procure pelo botão roxo no canto inferior direito</span>
						</div>
					</div>
				</div>
			</div>
			
			<!-- Progress bar -->
			<div class="h-1 bg-gray-100">
				<div class="h-full bg-gradient-to-r from-blue-500 to-purple-600 animate-progress" style="animation-duration: {duration}ms;"></div>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes slide-in-right {
		from {
			opacity: 0;
			transform: translateX(100%);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
	
	@keyframes progress {
		from {
			width: 0%;
		}
		to {
			width: 100%;
		}
	}
	
	.animate-slide-in-right {
		animation: slide-in-right 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}
	
	.animate-progress {
		animation: progress linear forwards;
	}
	
	/* Mobile adjustments */
	@media (max-width: 640px) {
		div[role="alert"] {
			bottom: 1rem;
			right: 1rem;
			left: 1rem;
			max-width: none;
		}
	}
</style>
