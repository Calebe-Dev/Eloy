<script lang="ts">
	import { onMount } from 'svelte';
	import { notifications } from '$lib/stores/notifications.js';

	interface Props {
		message: string;
		icon?: string;
		delay?: number;
		duration?: number;
		triggerOnScroll?: boolean;
		scrollThreshold?: number;
		gradient?: string;
	}

	let {
		message,
		icon = '💡',
		delay = 0,
		duration = 5000,
		triggerOnScroll = false,
		scrollThreshold = 0,
		gradient = 'from-blue-600 to-cyan-600'
	}: Props = $props();

	let triggered = $state(false);
	let notificationId = '';

	onMount(() => {
		if (triggerOnScroll) {
			const handleScroll = () => {
				// Ignora notificações apenas durante scroll programático (por botões)
				if (sessionStorage.getItem('programmatic-scroll') === 'true') {
					return;
				}
				
				if (!triggered && window.scrollY > scrollThreshold) {
					triggered = true;
					setTimeout(() => {
						showNotification();
					}, delay);
				}
			};

			window.addEventListener('scroll', handleScroll, { passive: true });

			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		} else {
			const showTimer = setTimeout(() => {
				// Sempre mostra notificações baseadas em tempo (não afetadas por scroll programático)
				showNotification();
			}, delay);

			return () => {
				clearTimeout(showTimer);
			};
		}
	});

	function showNotification() {
		notificationId = `hint-${Date.now()}-${Math.random()}`;
		
		notifications.add({
			id: notificationId,
			message,
			icon,
			gradient
		});

		if (duration > 0) {
			setTimeout(() => {
				notifications.remove(notificationId);
			}, duration);
		}
	}
</script>
