<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		/**
		 * Elemento a ser observado para detectar visibilidade
		 */
		targetElement?: HTMLElement;
		/**
		 * Número total de passos/itens na animação
		 */
		totalSteps: number;
		/**
		 * Passo atual (0 a totalSteps)
		 */
		currentStep: number;
		/**
		 * Posição da barra (padrão: bottom-center)
		 */
		position?: 'bottom-center' | 'top-center' | 'bottom-left' | 'bottom-right';
		/**
		 * Threshold do IntersectionObserver (0-1)
		 */
		visibilityThreshold?: number;
	}

	let { 
		targetElement = $bindable(),
		totalSteps, 
		currentStep,
		position = 'bottom-center',
		visibilityThreshold = 0.1
	}: Props = $props();

	let isVisible = $state(false);

	// Calcula as classes de posição
	const positionClasses = $derived(() => {
		switch (position) {
			case 'top-center':
				return 'top-8 left-1/2 -translate-x-1/2';
			case 'bottom-left':
				return 'bottom-8 left-8';
			case 'bottom-right':
				return 'bottom-8 right-8';
			case 'bottom-center':
			default:
				return 'bottom-8 left-1/2 -translate-x-1/2';
		}
	});

	// Usa $effect para reagir quando targetElement estiver disponível
	$effect(() => {
		if (!targetElement) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					isVisible = entry.isIntersecting;
				});
			},
			{
				threshold: visibilityThreshold,
				rootMargin: '0px'
			}
		);

		observer.observe(targetElement);

		return () => {
			observer.disconnect();
		};
	});
</script>

{#if isVisible}
	<div 
		class="fixed z-50 flex items-center gap-2 bg-gray-900/60 backdrop-blur-xl px-5 py-3 rounded-full shadow-lg transition-all duration-500 ease-out {positionClasses()}"
		style="animation: fadeInUp 0.5s ease-out;"
	>
		{#each Array(totalSteps) as _, index}
			<div 
				class="w-2 h-2 rounded-full transition-all duration-500"
				class:bg-white={index < currentStep}
				class:bg-gray-500={index >= currentStep}
			></div>
		{/each}
	</div>
{/if}

<style>
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
