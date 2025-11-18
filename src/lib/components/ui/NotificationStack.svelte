<script lang="ts">
	import { notifications } from '$lib/stores/notifications.js';
	import { fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	function close(id: string) {
		notifications.remove(id);
	}
</script>

{#each $notifications as notification (notification.id)}
	<div
		in:fly={{ x: 100, duration: 400, easing: quintOut }}
		out:fade={{ duration: 200 }}
		class="fixed z-50 transition-all duration-500 ease-out"
		style="bottom: {6 + notification.index * 5}rem; right: 1.5rem;"
		role="status"
		aria-live="polite"
	>
		<div
			class="flex items-center gap-3 rounded-full bg-gradient-to-r {notification.gradient} px-5 py-3 text-white shadow-2xl backdrop-blur-md transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-opacity-90"
			style="box-shadow: 0 10px 40px -5px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 255, 255, 0.1) inset;"
		>
			{#if notification.icon}
				<span class="text-lg">{notification.icon}</span>
			{/if}
			<span class="text-sm font-medium">{notification.message}</span>
			<button
				onclick={() => close(notification.id)}
				class="ml-1 flex-shrink-0 rounded-full p-1 transition-colors hover:bg-white/20"
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
{/each}
