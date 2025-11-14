<script lang="ts">
	import { onMount } from 'svelte';
	
	let show = $state(false);
	let currentTip = $state(0);
	
	const tips = [
		{
			icon: '👆',
			text: 'Clique nos cards para ver mais detalhes',
			action: 'Interaja'
		},
		{
			icon: '💬',
			text: 'Abra o chat para fazer perguntas',
			action: 'Converse'
		},
		{
			icon: '📊',
			text: 'Veja os resultados reais de clientes',
			action: 'Explore'
		},
		{
			icon: '🎯',
			text: 'Teste grátis por 14 dias',
			action: 'Experimente'
		}
	];
	
	onMount(() => {
		// Mostra a primeira dica após 3 segundos
		const initialDelay = setTimeout(() => {
			show = true;
		}, 3000);
		
		// Rotaciona as dicas a cada 6 segundos
		const interval = setInterval(() => {
			if (show) {
				// Fade out
				show = false;
				
				// Muda a dica e fade in
				setTimeout(() => {
					currentTip = (currentTip + 1) % tips.length;
					show = true;
				}, 300);
			}
		}, 6000);
		
		// Para de mostrar após 30 segundos (5 ciclos completos)
		const hideTimer = setTimeout(() => {
			show = false;
			clearInterval(interval);
		}, 30000);
		
		return () => {
			clearTimeout(initialDelay);
			clearInterval(interval);
			clearTimeout(hideTimer);
		};
	});
	
	function handleDismiss() {
		show = false;
	}
</script>

{#if show}
	<div 
		class="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 animate-fade-in-up"
		role="status"
		aria-live="polite"
	>
		<div class="relative">
			<!-- Glow effect -->
			<div class="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-40"></div>
			
			<!-- Content -->
			<div class="relative bg-white rounded-full shadow-xl border border-gray-200 px-6 py-3 flex items-center gap-3 max-w-md">
				<!-- Icon -->
				<span class="text-2xl" role="img" aria-label="Dica">
					{tips[currentTip].icon}
				</span>
				
				<!-- Text -->
				<div class="flex-1 min-w-0">
					<p class="text-gray-700 text-sm font-medium">
						{tips[currentTip].text}
					</p>
				</div>
				
				<!-- Action badge -->
				<span class="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-sm whitespace-nowrap">
					{tips[currentTip].action}
				</span>
				
				<!-- Close button -->
				<button 
					onclick={handleDismiss}
					class="text-gray-400 hover:text-gray-600 transition-colors ml-1"
					aria-label="Dispensar dica"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes fade-in-up {
		from {
			opacity: 0;
			transform: translate(-50%, 10px);
		}
		to {
			opacity: 1;
			transform: translate(-50%, 0);
		}
	}
	
	.animate-fade-in-up {
		animation: fade-in-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}
	
	/* Mobile adjustments */
	@media (max-width: 640px) {
		div[role="status"] > div > div {
			max-width: calc(100vw - 2rem);
			padding: 0.75rem 1rem;
		}
		
		div[role="status"] > div > div span:last-of-type {
			display: none;
		}
	}
</style>
