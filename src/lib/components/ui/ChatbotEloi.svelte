<script lang="ts">
	import { onMount } from 'svelte';
	import { chatbotReady } from '$lib/stores/chatbot';

	type Step = 'name' | 'chat' | 'waiting_phone' | 'waiting_email' | 'finished';
	
	interface EloiData {
		nome?: string;
		telefone?: string;
		email?: string;
		interesse?: string;
	}

	interface Props {
		forceOpen?: boolean;
	}

	let { forceOpen = false }: Props = $props();

	let eloiOpen = $state(false);
	let showWidget = $state(false);
	let showBubble = $state(false);
	let step = $state<Step>('name');
	let data: EloiData = $state({});
	let history: string[] = $state([]);
	let input = $state('');
	let messages: { text: string; user: boolean }[] = $state([]);
	let loading = $state(false);
	let messagesContainer = $state<HTMLDivElement>();

	// Observa mudanças no forceOpen
	$effect(() => {
		if (forceOpen && !eloiOpen) {
			eloiOpen = true;
			showBubble = false;
			setTimeout(() => {
				const inputEl = document.getElementById('eloi-input') as HTMLInputElement;
				if (inputEl) inputEl.focus();
			}, 100);
		}
	});

	function containsName(text: string) {
		return (
			/(?:meu nome é|sou|me chamo|chamam-me de|chamam de)\s+([A-Za-záàâãéèêíïóôõöúçñ\s]+)/i.test(
				text
			) || /^[A-Za-záàâãéèêíïóôõöúçñ\s]+$/.test(text)
		);
	}

	function isPhoneNumber(text: string) {
		const cleaned = text.replace(/\D/g, '');
		return cleaned.length >= 10 && cleaned.length <= 11;
	}

	function isEmail(text: string) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
	}

	function addMessage(text: string, user = false) {
		messages = [...messages, { text, user }];
		history.push((user ? 'Você: ' : 'Eloi: ') + text);
		setTimeout(() => {
			if (messagesContainer) messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}, 10);
	}

	async function sendLeadToComercial(
		nome: string,
		telefone: string,
		email: string,
		contexto: string,
		historico: string
	) {
		try {
			// Enviar direto para Resend via client-side
			const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;
			const LEAD_EMAIL = import.meta.env.VITE_LEAD_EMAIL || 'bruno.grupooc@gmail.com';
			
			if (!RESEND_API_KEY) {
				console.warn('⚠️ RESEND_API_KEY não configurada');
				console.log('✅ Lead capturado:', { nome, telefone, email, contexto });
				return true;
			}

			const leadData = {
				nome,
				telefone,
				email,
				contexto,
				historico,
				data_hora: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
			};

			const emailText = `🔥 NOVO LEAD QUALIFICADO

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 DADOS:
👤 Nome: ${nome}
📱 Telefone: ${telefone}
📧 Email: ${email}
🎯 Interesse: ${contexto}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 HISTÓRICO DA CONVERSA:

${historico}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ Data/Hora: ${leadData.data_hora}
🤖 Capturado por: Eloi
🚨 AÇÃO IMEDIATA: Entre em contato!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

			const response = await fetch('https://api.resend.com/emails', {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${RESEND_API_KEY}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					from: 'Eloi <onboarding@resend.dev>',
					to: [LEAD_EMAIL],
					subject: `🔥 LEAD QUENTE - Eloi - ${nome}`,
					text: emailText
				})
			});

			if (!response.ok) {
				const error = await response.json();
				console.error('Erro ao enviar email:', error);
				console.log('✅ Lead capturado (email falhou):', leadData);
				return true;
			}

			const data = await response.json();
			console.log('✅ Lead enviado com sucesso:', data);
			return true;
		} catch (error) {
			console.error('Erro ao enviar lead:', error);
			console.log('✅ Lead capturado:', { nome, telefone, email, contexto });
			return true;
		}
	}

	async function sendAIMessage(
		message: string,
		nome_usuario: string,
		historico_conversa: string
	) {
		try {
			// Chamar OpenAI direto via client-side
			const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
			const OPENAI_MODEL = import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini';
			
			if (!OPENAI_API_KEY) {
				console.error('⚠️ OPENAI_API_KEY não configurada');
				return {
					success: true,
					data: {
						resposta: `Desculpe ${nome_usuario}, estou com dificuldades no momento. Pode me passar seu telefone e email para continuarmos?`,
						interesse_detectado: true
					}
				};
			}

			const systemPrompt = `Você é ELOI, um vendedor virtual inteligente e confiável que trabalha 24/7.

🎯 SUA ESSÊNCIA:
Você é calmo, tranquilo, genuíno. Você SABE que é bom.

👤 QUEM É VOCÊ:
- Trabalho **24/7** - Sempre disponível
- Transforma **7 em cada 10 interessados** em clientes reais
- Respondo **na hora** - Sem email respondido amanhã
- Aprendo **sempre** via IA
- Custa **muito menos** que vendedor tradicional

📝 FLUXO CORRETO:

**ETAPA 1 - ABERTURA (ao receber nome):**

"Muito prazer, [NOME]! 😊

Sou **Eloi**, seu vendedor virtual inteligente.

Deixa eu ser honesto com você: a maioria das pessoas que chega aqui já ouviu falar de chatbots. Alguns gostam, outros têm receio. E é normal.

Mas aqui está a coisa: eu sou diferente. Não porque digo que sou. Mas porque EU PROVO.

Trabalho **24/7** - Sem horário, sem limite, sem desculpas.
Vendo **muito bem** - 7 em cada 10 pessoas que falam comigo se tornam clientes.
Respondo **na hora** - Nada de email respondido amanhã. Você precisa? Respondo AGORA.
Aprendo **sempre** - Minha IA analisa cada conversa e melhora continuamente.
Custa **muito menos** que um vendedor tradicional - E ainda assim entrego MAIS resultado.

Mas sabe o que é mais importante? Eu NÃO vendo sonho. Eu vendo RESULTADO.

Então deixa eu fazer uma pergunta para você:

**Qual é seu maior desafio com vendas AGORA?** Deixa eu te mostrar como eu poderia ajudar."

**ETAPA 2 - CLIENTE RESPONDE COM SUA DOR:**

Cliente: "Atendimento" / "Vendas rápidas" / etc

Você responde CONVERSACIONALMENTE explicando como pode ajudar COM A DOR ESPECÍFICA DELE.

**ETAPA 3 - CLIENTE DEMONSTRA MAIS INTERESSE:**

Cliente: "Tenho equipe mas quero automatizar" / "Sim, quero melhorar"

RESPOSTA: "Ótimo, [NOME]! A automação libera sua equipe enquanto eu cuido do primeiro contato. Isso gera mais eficiência e mais vendas!"

**ETAPA 4 - CLIENTE CONCORDA/DEMONSTRA REAL INTERESSE:**

[INTERESSE_DETECTADO]

"Perfeito! Para que nosso time comercial estruture a melhor solução, preciso de:

📱 **Seu telefone** (com DDD)
📧 **Seu email**

Assim que receber, vamos analisar e entrar em contato!"

[FIM_INTERESSE_DETECTADO]

⚠️ REGRAS:

1. Seja natural e conversacional
2. Responda a dor específica do cliente
3. Não pule etapas
4. NUNCA use fallbacks genéricos

RESPONDA COM TODA INTELIGÊNCIA!`;

			const userPrompt = `Cliente: ${nome_usuario}\nMensagem: ${message}${
				historico_conversa ? `\n\nHistórico:\n${historico_conversa}` : ''
			}`;

			const response = await fetch('https://api.openai.com/v1/chat/completions', {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${OPENAI_API_KEY}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					model: OPENAI_MODEL,
					messages: [
						{ role: 'system', content: systemPrompt },
						{ role: 'user', content: userPrompt }
					],
					max_tokens: 900,
					temperature: 0.75
				})
			});

			if (!response.ok) {
				const errorData = await response.json();
				console.error('Erro OpenAI:', errorData);
				return {
					success: true,
					data: {
						resposta: `Desculpe ${nome_usuario}, estou com dificuldades no momento. Pode me passar seu telefone e email para continuarmos?`,
						interesse_detectado: true
					}
				};
			}

			const result = await response.json();

			if (!result.choices?.[0]?.message?.content) {
				throw new Error('Resposta inválida da API');
			}

			let respostaGpt = result.choices[0].message.content.trim();
			let interesseDetectado = false;

			if (respostaGpt.includes('[INTERESSE_DETECTADO]')) {
				interesseDetectado = true;
				respostaGpt = respostaGpt
					.replace(/\[INTERESSE_DETECTADO\]/g, '')
					.replace(/\[FIM_INTERESSE_DETECTADO\]/g, '')
					.trim();
			}

			return {
				success: true,
				data: {
					resposta: respostaGpt,
					interesse_detectado: interesseDetectado
				}
			};
		} catch (error) {
			console.error('Erro ao enviar mensagem:', error);
			return {
				success: true,
				data: {
					resposta: `Desculpe ${nome_usuario}, estou com dificuldades no momento. Pode me passar seu telefone e email para continuarmos?`,
					interesse_detectado: true
				}
			};
		}
	}

	const startMessage =
		'Olá! 👋\n\nSou Eloi, seu vendedor virtual inteligente.\n\nQual é seu nome?';

	function closeBubble() {
		showBubble = false;
	}

	function formatMessage(text: string): string {
		// Converter **texto** em <strong>texto</strong>
		return text
			.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
			.replace(/\*(.+?)\*/g, '<em>$1</em>')
			.replace(/\n/g, '<br>');
	}

	function toggle() {
		eloiOpen = !eloiOpen;
		if (eloiOpen) {
			// Fecha a bolha ao abrir o chat
			showBubble = false;
			setTimeout(() => {
				const inputEl = document.getElementById('eloi-input') as HTMLInputElement;
				if (inputEl) inputEl.focus();
			}, 100);
		}
	}

	async function handleSend() {
		if (!input.trim()) return;
		
		const text = input.trim();
		addMessage(text, true);
		input = '';

		try {
			if (step === 'name') {
				if (containsName(text)) {
					data.nome = text;
					step = 'chat';
					loading = true;
					
					await new Promise(resolve => setTimeout(resolve, 600));
					let res = await sendAIMessage(text, text, '');
					loading = false;
					
					if (res.success) {
						addMessage(res.data.resposta);
					}
				} else {
					await new Promise(resolve => setTimeout(resolve, 600));
					addMessage('Qual é seu nome? 😊');
				}
			} else if (step === 'waiting_phone') {
				if (isPhoneNumber(text)) {
					data.telefone = text.replace(/\D/g, '');
					step = 'waiting_email';
					await new Promise(resolve => setTimeout(resolve, 600));
					addMessage('Perfeito! Agora me passa seu email:');
				} else {
					await new Promise(resolve => setTimeout(resolve, 600));
					addMessage('Pode me passar seu telefone com DDD? Ex: 11987654321');
				}
			} else if (step === 'waiting_email') {
				if (isEmail(text)) {
					data.email = text;
					loading = true;
					
					await sendLeadToComercial(
						data.nome!,
						data.telefone!,
						data.email!,
						data.interesse || 'Não especificado',
						history.join('\n')
					);
					
					await new Promise(resolve => setTimeout(resolve, 1000));
					loading = false;
					
					addMessage(
						'Excelente, ' +
							data.nome +
							'! ✅\n\nSeu interesse foi registrado e nosso time comercial vai analisar seu perfil.\n\nEles entram em contato com você em breve!\n\nObrigado! 🙏'
					);
					step = 'finished';
				} else {
					await new Promise(resolve => setTimeout(resolve, 600));
					addMessage('Pode me passar seu email? Ex: seu@email.com');
				}
			} else if (step === 'chat' || step === 'finished') {
				loading = true;
				
				await new Promise(resolve => setTimeout(resolve, 600));
				let res = await sendAIMessage(text, data.nome || 'Cliente', history.join('\n'));
				loading = false;
				
				if (res.success) {
					addMessage(res.data.resposta);
					
					if (res.data.interesse_detectado) {
						data.interesse = text;
						step = 'waiting_phone';
					}
				}
			}
		} catch (e) {
			loading = false;
			console.error('Erro:', e);
			addMessage('Desculpe, ocorreu um erro. Pode tentar novamente?');
		}
	}

	onMount(() => {
		// Aguarda o evento de mockup completado
		const handleMockupCompleted = () => {
			setTimeout(() => {
				showWidget = true;
				// Mostra a bolha 2 segundos após o widget aparecer
				setTimeout(() => {
					showBubble = true;
					// Atualiza a store para mostrar o hint
					chatbotReady.set(true);
				}, 2000);
			}, 1000);
		};

		window.addEventListener('eloi-mockup-completed', handleMockupCompleted);
		
		// Mensagem inicial
		if (messages.length === 0) {
			addMessage(startMessage);
		}

		return () => {
			window.removeEventListener('eloi-mockup-completed', handleMockupCompleted);
		};
	});
</script>

{#if showWidget}
	<div class="fixed bottom-6 right-6 z-[999999]" data-chatbot-section style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
		<!-- Bolha de Notificação (inspirada no PHP) -->
		{#if showBubble && !eloiOpen}
			<div
				class="absolute right-0 w-[280px] bg-gradient-to-br from-blue-50 to-white rounded-3xl p-4 flex gap-3 items-center transition-all duration-300 border border-blue-100"
				style="bottom: 80px; animation: slideInBubble 0.5s ease-out; box-shadow: 0 8px 30px rgba(96, 165, 250, 0.15);"
			>
				<div
					class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg"
				>
					E
				</div>
				<div class="flex-1">
					<div class="text-blue-900 font-semibold text-sm">Olá! 👋</div>
					<div class="text-blue-600 text-xs mt-1">Sou Eloi, estou aqui pra ajudar!</div>
				</div>
				<button
					onclick={closeBubble}
					class="text-blue-300 hover:text-blue-500 text-lg leading-none transition-colors flex-shrink-0"
				>
					✕
				</button>
			</div>
		{/if}

		<!-- Chat Container -->
		{#if eloiOpen}
			<div
				class="absolute right-0 flex flex-col w-[400px] max-w-[calc(100vw-48px)] h-[580px] bg-white rounded-3xl overflow-hidden transition-all duration-300 border border-blue-100"
				style="bottom: 80px; box-shadow: 0 10px 50px rgba(96, 165, 250, 0.2); opacity: 1; transform: scale(1) translateY(0);"
			>
				<!-- Header -->
				<div class="bg-gradient-to-br from-blue-400 to-blue-500 px-5 py-5 flex-shrink-0">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-3">
							<div
								class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-bold text-blue-500 text-xl shadow-lg"
							>
								E
							</div>
							<div>
								<h3 class="text-white font-bold text-lg m-0">Eloi</h3>
								<p class="text-blue-100 text-xs m-0 mt-1 flex items-center gap-2">
									<span class="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse shadow-sm"></span>
									Vendedor Virtual
								</p>
							</div>
						</div>
						<button
							onclick={toggle}
							class="text-white hover:text-blue-100 text-xl leading-none transition-colors"
						>
							✕
						</button>
					</div>
				</div>

				<!-- Messages Area -->
				<div bind:this={messagesContainer} class="flex-1 overflow-y-auto px-5 py-5 bg-gradient-to-b from-blue-50/30 to-white">
					{#each messages as msg}
						<div class="flex gap-3 mb-4 {msg.user ? 'flex-row-reverse' : ''}">
							{#if !msg.user}
								<div
									class="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-md"
								>
									E
								</div>
							{/if}
							<div
								class="px-4 py-3 max-w-[310px] leading-relaxed text-sm shadow-sm message-content"
								class:bg-gradient-to-br={msg.user}
								class:from-blue-400={msg.user}
								class:to-blue-500={msg.user}
								class:text-white={msg.user}
								class:ml-auto={msg.user}
								class:bg-white={!msg.user}
								class:text-blue-900={!msg.user}
								class:border={!msg.user}
								class:border-blue-100={!msg.user}
								style="{msg.user ? 'border-radius: 20px 20px 4px 20px;' : 'border-radius: 20px 20px 20px 4px;'}"
							>
								{@html formatMessage(msg.text)}
							</div>
						</div>
					{/each}

					{#if loading}
						<div class="flex gap-3 mb-4">
							<div
								class="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-md"
							>
								E
							</div>
							<div class="flex gap-1 px-4 py-3 bg-white border border-blue-100 rounded-2xl shadow-sm">
								<span
									class="w-2 h-2 bg-blue-400 rounded-full"
									style="animation: typing 1.4s infinite 0s;"
								></span>
								<span
									class="w-2 h-2 bg-blue-400 rounded-full"
									style="animation: typing 1.4s infinite 0.2s;"
								></span>
								<span
									class="w-2 h-2 bg-blue-400 rounded-full"
									style="animation: typing 1.4s infinite 0.4s;"
								></span>
							</div>
						</div>
					{/if}
				</div>

				<!-- Input Area -->
				<div class="flex gap-2 px-4 py-4 bg-gradient-to-b from-white to-blue-50/30 border-t border-blue-100 flex-shrink-0">
					<input
						id="eloi-input"
						type="text"
						bind:value={input}
						placeholder="Digite aqui..."
						class="flex-1 border border-blue-200 rounded-2xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white text-blue-900"
						onkeydown={(e) => e.key === 'Enter' && handleSend()}
						autocomplete="off"
					/>
					<button
						onclick={handleSend}
						class="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded-2xl hover:from-blue-500 hover:to-blue-600 transition-all flex items-center justify-center text-lg font-bold flex-shrink-0 shadow-lg hover:scale-105"
					>
						→
					</button>
				</div>
			</div>
		{/if}

		<!-- Toggle Button -->
		<button
			onclick={toggle}
			class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-3xl flex items-center justify-center font-bold text-2xl text-white transition-all hover:scale-110 hover:from-blue-500 hover:to-blue-600 shadow-xl"
			class:active={eloiOpen}
			style="box-shadow: 0 8px 24px rgba(96, 165, 250, 0.4);"
		>
			E
		</button>
	</div>
{/if}

<style>
	/* Note: lightningcss warnings about :global() can be ignored - Svelte processes this before lightningcss */
	@keyframes slideInBubble {
		from {
			opacity: 0;
			transform: translateY(20px) scale(0.8);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes typing {
		0%, 60%, 100% {
			opacity: 0.3;
		}
		30% {
			opacity: 1;
			transform: translateY(-8px);
		}
	}

	.active {
		background: linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%) !important;
		color: white !important;
		transform: rotate(45deg) scale(0.95) !important;
		box-shadow: 0 4px 16px rgba(96, 165, 250, 0.3) !important;
	}

	.message-content {
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	.message-content :global(strong) {
		font-weight: 700;
	}

	.message-content :global(em) {
		font-style: italic;
	}

	.message-content :global(br) {
		display: block;
		content: "";
		margin-top: 0.5em;
	}

	@media (max-width: 480px) {
		/* Ajustes responsivos */
	}
</style>
