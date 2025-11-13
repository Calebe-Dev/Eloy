// Service Worker para cache agressivo
const CACHE_NAME = 'eloi-v1';
const STATIC_CACHE = [
	'/',
	'/fonts/inter-400.woff2',
	'/fonts/inter-600.woff2'
];

// Instalação: cachear recursos estáticos
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(STATIC_CACHE).catch((err) => {
				console.log('Cache failed:', err);
			});
		})
	);
	self.skipWaiting();
});

// Ativação: limpar caches antigos
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName !== CACHE_NAME) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
	self.clients.claim();
});

// Fetch: cache first para assets, network first para HTML
self.addEventListener('fetch', (event) => {
	const { request } = event;
	const url = new URL(request.url);

	// Ignorar requests não-HTTP
	if (!url.protocol.startsWith('http')) return;

	// Ignorar APIs externas
	if (url.hostname.includes('api.openai.com') || url.hostname.includes('api.resend.com')) {
		return;
	}

	// Cache-first para assets (fontes, CSS, JS, imagens)
	if (
		request.destination === 'font' ||
		request.destination === 'style' ||
		request.destination === 'script' ||
		request.destination === 'image'
	) {
		event.respondWith(
			caches.match(request).then((response) => {
				return (
					response ||
					fetch(request).then((fetchResponse) => {
						return caches.open(CACHE_NAME).then((cache) => {
							cache.put(request, fetchResponse.clone());
							return fetchResponse;
						});
					})
				);
			})
		);
		return;
	}

	// Network-first para HTML e documentos
	event.respondWith(
		fetch(request)
			.then((response) => {
				// Cache a resposta se for bem-sucedida
				if (response.status === 200) {
					const responseClone = response.clone();
					caches.open(CACHE_NAME).then((cache) => {
						cache.put(request, responseClone);
					});
				}
				return response;
			})
			.catch(() => {
				// Fallback para cache se offline
				return caches.match(request);
			})
	);
});
