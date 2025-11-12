<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		target: number;
		duration?: number;
		suffix?: string;
		prefix?: string;
		delay?: number;
	}

	let { target, duration = 2000, suffix = '', prefix = '', delay = 0 }: Props = $props();

	let count = $state(0);
	let hasStarted = $state(false);
	let element: HTMLDivElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasStarted) {
						setTimeout(() => {
							hasStarted = true;
							animateCount();
						}, delay);
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.3 }
		);

		observer.observe(element);

		return () => observer.disconnect();
	});

	function animateCount() {
		const startTime = Date.now();
		const startValue = 0;
		const endValue = target;

		const animate = () => {
			const now = Date.now();
			const progress = Math.min((now - startTime) / duration, 1);
			
			// Easing function (easeOutCubic)
			const eased = 1 - Math.pow(1 - progress, 3);
			count = Math.floor(startValue + (endValue - startValue) * eased);

			if (progress < 1) {
				requestAnimationFrame(animate);
			} else {
				count = endValue;
			}
		};

		requestAnimationFrame(animate);
	}
</script>

<div bind:this={element} class="inline-block">
	{prefix}{count.toLocaleString('pt-BR')}{suffix}
</div>
