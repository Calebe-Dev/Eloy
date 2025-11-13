// Service Worker otimizado para 100% PageSpeed - v3
// Estratégia: stale-while-revalidate para melhor cache e performance
const CACHE_NAME = 'eloi-v3';
const STATIC_CACHE = [
	'/',
	'/fonts/inter-400.woff2'
];

// Recursos que devem usar cache-first (imutáveis)
const IMMUTABLE_PATHS = ['/fonts/', '/_app/immutable/'];

// Instalação: cachear recursos críticos
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(STATIC_CACHE).catch((err) => {
				console.warn('Cache install failed:', err);
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

// Fetch: estratégia otimizada por tipo de recurso
self.addEventListener('fetch', (event) => {
	const { request } = event;
	const url = new URL(request.url);

	// Ignorar requests não-HTTP
	if (!url.protocol.startsWith('http')) return;

	// Ignorar APIs externas (sempre network-only)
	if (url.hostname.includes('api.openai.com') || url.hostname.includes('api.resend.com')) {
		return;
	}

	// Cache-first para recursos imutáveis (fonts, assets com hash)
	const isImmutable = IMMUTABLE_PATHS.some(path => url.pathname.includes(path));
	if (isImmutable || request.destination === 'font') {
		event.respondWith(
			caches.match(request).then((cachedResponse) => {
				if (cachedResponse) return cachedResponse;
				
				return fetch(request).then((response) => {
					if (response.status === 200) {
						const responseClone = response.clone();
						caches.open(CACHE_NAME).then((cache) => {
							cache.put(request, responseClone);
						});
					}
					return response;
				});
			})
		);
		return;
	}

	// Stale-while-revalidate para CSS/JS (melhor performance)
	if (request.destination === 'style' || request.destination === 'script') {
		event.respondWith(
			caches.match(request).then((cachedResponse) => {
				const fetchPromise = fetch(request).then((response) => {
					if (response.status === 200) {
						const responseClone = response.clone();
						caches.open(CACHE_NAME).then((cache) => {
							cache.put(request, responseClone);
						});
					}
					return response;
				});
				
				// Retorna cache imediatamente, atualiza em background
				return cachedResponse || fetchPromise;
			})
		);
		return;
	}

	// Network-first para HTML e imagens (conteúdo dinâmico)
	event.respondWith(
		fetch(request)
			.then((response) => {
				if (response.status === 200 && request.destination === 'image') {
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
