<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		/**
		 * Tipo de animação scroll-driven
		 */
		animation?: 'fade-up' | 'fade-down' | 'scale' | 'slide-left' | 'slide-right' | 'rotate' | 'parallax' | 'blur';
		/**
		 * Delay em ms
		 */
		delay?: number;
		/**
		 * Duração da animação em ms
		 */
		duration?: number;
		/**
		 * Classes CSS adicionais
		 */
		class?: string;
		/**
		 * Threshold para IntersectionObserver (0-1)
		 */
		threshold?: number;
		/**
		 * Se a animação deve acontecer apenas uma vez
		 */
		once?: boolean;
		/**
		 * Conteúdo filho
		 */
		children: Snippet;
	}

	let {
		animation = 'fade-up',
		delay = 0,
		duration = 1000,
		class: className = '',
		threshold = 0.15,
		once = true,
		children
	}: Props = $props();

	let element: HTMLDivElement;
	let scrollProgress = $state(0);
	let isInView = $state(false);
	let hasAnimated = $state(false);

	// Calcula as transformações baseadas no progresso do scroll
	const getTransform = $derived(() => {
		if (!isInView && once && hasAnimated) return '';
		if (!isInView && !hasAnimated) {
			switch (animation) {
				case 'fade-up':
					return 'translateY(60px)';
				case 'fade-down':
					return 'translateY(-60px)';
				case 'scale':
					return 'scale(0.8)';
				case 'slide-left':
					return 'translateX(-100px)';
				case 'slide-right':
					return 'translateX(100px)';
				case 'rotate':
					return 'rotate(-10deg) scale(0.9)';
				case 'parallax':
					return `translateY(${scrollProgress * 100}px)`;
				case 'blur':
					return 'translateY(40px)';
				default:
					return 'translateY(60px)';
			}
		}
		return 'translateY(0) translateX(0) scale(1) rotate(0)';
	});

	const getOpacity = $derived(() => {
		if (!isInView && !hasAnimated) return 0;
		if (animation === 'parallax') return Math.max(0.3, 1 - scrollProgress * 0.7);
		return 1;
	});

	const getBlur = $derived(() => {
		if (animation === 'blur' && !isInView && !hasAnimated) return 'blur(10px)';
		return 'blur(0)';
	});

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setTimeout(() => {
							isInView = true;
							hasAnimated = true;
						}, delay);
						
						if (once) {
							observer.unobserve(entry.target);
						}
					} else if (!once) {
						isInView = false;
					}
				});
			},
			{ 
				threshold,
				rootMargin: '0px 0px -10% 0px'
			}
		);

		observer.observe(element);

		// Parallax effect on scroll
		if (animation === 'parallax') {
			const handleScroll = () => {
				if (!element) return;
				const rect = element.getBoundingClientRect();
				const elementTop = rect.top;
				const elementHeight = rect.height;
				const windowHeight = window.innerHeight;
				
				// Calcula o progresso (0 = topo da viewport, 1 = saiu da viewport)
				const progress = Math.max(0, Math.min(1, 1 - (elementTop + elementHeight) / (windowHeight + elementHeight)));
				scrollProgress = progress;
			};

			window.addEventListener('scroll', handleScroll, { passive: true });
			handleScroll();

			return () => {
				observer.disconnect();
				window.removeEventListener('scroll', handleScroll);
			};
		}

		return () => observer.disconnect();
	});
</script>

<div
	bind:this={element}
	class={`transition-all ease-out ${className}`}
	style={`
		transform: ${getTransform()};
		opacity: ${getOpacity()};
		filter: ${getBlur()};
		transition-duration: ${duration}ms;
	`}
>
	{@render children()}
</div>
