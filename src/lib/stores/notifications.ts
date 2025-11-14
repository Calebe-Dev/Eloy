import { writable } from 'svelte/store';

export interface Notification {
	id: string;
	message: string;
	icon: string;
	gradient: string;
	index: number;
}

function createNotificationStore() {
	const { subscribe, update } = writable<Notification[]>([]);

	return {
		subscribe,
		add: (notification: Omit<Notification, 'index'>) => {
			update(notifications => {
				// Incrementa o index de todas as notificações existentes
				const updatedNotifications = notifications.map(n => ({
					...n,
					index: n.index + 1
				}));
				
				// Adiciona a nova notificação no index 0
				return [{ ...notification, index: 0 }, ...updatedNotifications];
			});
		},
		remove: (id: string) => {
			update(notifications => {
				const filtered = notifications.filter(n => n.id !== id);
				// Reajusta os indexes após remoção
				return filtered.map((n, i) => ({
					...n,
					index: filtered.length - 1 - i
				}));
			});
		}
	};
}

export const notifications = createNotificationStore();
