<script lang="ts">
	import { onMount } from 'svelte';
	
	let countdown = $state(3);
	let mensagem = $state('');
	const whatsappNumber = '5515996510375';
	
	onMount(() => {
		// Pega a mensagem da URL usando window.location
		const params = new URLSearchParams(window.location.search);
		mensagem = params.get('msg') || 'Olá! Gostaria de solicitar um orçamento para o Eloi.';
		
		const interval = setInterval(() => {
			countdown--;
			if (countdown <= 0) {
				clearInterval(interval);
				// Redireciona para o WhatsApp
				const encodedMessage = encodeURIComponent(mensagem);
				window.location.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
			}
		}, 1000);
		
		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>Redirecionando para WhatsApp - Eloi</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
	<div class="max-w-md w-full">
		<!-- Card de Redirecionamento -->
		<div class="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center border border-white/20">
			<!-- Ícone WhatsApp Animado -->
			<div class="relative w-24 h-24 mx-auto mb-6">
				<div class="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full animate-pulse opacity-20"></div>
				<div class="absolute inset-2 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center">
					<svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
						<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
					</svg>
				</div>
			</div>

			<!-- Título -->
			<h1 class="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2">
				Conectando com Eloi
			</h1>
			
			<!-- Mensagem -->
			<p class="text-gray-600 mb-6">
				Você será redirecionado para o WhatsApp em:
			</p>
			
			<!-- Contador -->
			<div class="relative w-32 h-32 mx-auto mb-6">
				<!-- Círculo de fundo -->
				<svg class="w-full h-full transform -rotate-90">
					<circle
						cx="64"
						cy="64"
						r="56"
						stroke="currentColor"
						stroke-width="8"
						fill="none"
						class="text-gray-200"
					/>
					<circle
						cx="64"
						cy="64"
						r="56"
						stroke="currentColor"
						stroke-width="8"
						fill="none"
						class="text-green-500 transition-all duration-1000"
						style="stroke-dasharray: 351.86; stroke-dashoffset: {351.86 * (countdown / 3)};"
					/>
				</svg>
				
				<!-- Número do contador -->
				<div class="absolute inset-0 flex items-center justify-center">
					<span class="text-5xl font-bold bg-gradient-to-br from-green-600 to-green-800 bg-clip-text text-transparent">
						{countdown}
					</span>
				</div>
			</div>
			
			<!-- Preview da mensagem -->
			<div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 mb-6 border border-gray-200">
				<p class="text-sm text-gray-500 mb-2 font-medium">Sua mensagem:</p>
				<p class="text-gray-700 text-sm leading-relaxed">"{mensagem}"</p>
			</div>
			
			<!-- Link manual -->
			<a
				href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensagem)}`}
				class="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
			>
				Ou clique aqui para ir agora
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
				</svg>
			</a>
		</div>
		
		<!-- Rodapé -->
		<p class="text-center text-gray-600 text-sm mt-6">
			Desenvolvido por <span class="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Grupo OC</span>
		</p>
	</div>
</div>
