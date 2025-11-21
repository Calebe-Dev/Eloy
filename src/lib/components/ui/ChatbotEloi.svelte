<script lang="ts">
	import { onMount } from 'svelte';
	import { chatbotReady } from '$lib/stores/chatbot.js';

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
	let userClickedButton = $state(false); // Track se usuário clicou no botão
	let phoneAttempts = $state(0); // Contador de tentativas de telefone
	let emailAttempts = $state(0); // Contador de tentativas de email

	// Observa mudanças no forceOpen
	$effect(() => {
		if (forceOpen && !eloiOpen) {
			userClickedButton = true; // Marca que usuário clicou
			showWidget = true; // Mostra widget imediatamente
			eloiOpen = true;
			showBubble = false;
			chatbotReady.set(true); // Marca como pronto para não mostrar hint
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

	// 🔍 Extrair telefone de qualquer texto
	function extractPhone(text: string): string | null {
		// Remove tudo que não é número
		const cleaned = text.replace(/\D/g, '');
		// Procura por sequência de 10-11 dígitos
		const phoneMatch = cleaned.match(/(\d{10,11})/);
		return phoneMatch ? phoneMatch[1] : null;
	}

	// 🔍 Extrair email de qualquer texto
	function extractEmail(text: string): string | null {
		const emailMatch = text.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
		return emailMatch ? emailMatch[0] : null;
	}

	// 🔍 Tentar extrair telefone E email de uma mensagem
	function extractContactInfo(text: string): { phone: string | null; email: string | null } {
		return {
			phone: extractPhone(text),
			email: extractEmail(text)
		};
	}

	function addMessage(text: string, user = false) {
		messages = [...messages, { text, user }];
		history.push((user ? 'Você: ' : 'Eloi: ') + text);
		setTimeout(() => {
			if (messagesContainer) messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}, 10);
	}

	// 📊 SISTEMA DE LOGS - Salvar todas as interações
	function saveInteractionLog(interactionData: any) {
		try {
			const logs = JSON.parse(localStorage.getItem('eloi_interactions') || '[]');
			const newLog = {
				id: `int_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
				...interactionData,
				timestamp: new Date().toISOString(),
				data_hora_br: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
				user_agent: navigator.userAgent,
				url: window.location.href
			};
			logs.push(newLog);
			localStorage.setItem('eloi_interactions', JSON.stringify(logs, null, 2));
			console.log('📊 Interação salva:', newLog.id);
			return newLog.id;
		} catch (error) {
			console.error('❌ Erro ao salvar log de interação:', error);
			return null;
		}
	}

	// 💾 Salvar lead no localStorage (REDUNDÂNCIA)
	async function saveLeadToLocalStorage(leadData: any) {
		try {
			const leads = JSON.parse(localStorage.getItem('eloi_leads') || '[]');
			const newLead = {
				id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
				...leadData,
				timestamp: new Date().toISOString(),
				data_hora_br: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
				user_agent: navigator.userAgent,
				url: window.location.href,
				email_sent: false,
				email_attempts: 0
			};
			leads.push(newLead);
			localStorage.setItem('eloi_leads', JSON.stringify(leads, null, 2));
			// Backup individual
			localStorage.setItem(`eloi_lead_${newLead.id}`, JSON.stringify(newLead, null, 2));
			console.log('💾 Lead salvo em localStorage:', newLead.id);
			console.log('📊 Total de leads salvos:', leads.length);
			return newLead.id;
		} catch (error) {
			console.error('❌ Erro ao salvar lead no localStorage:', error);
			// Fallback para sessionStorage
			try {
				sessionStorage.setItem(`eloi_lead_backup_${Date.now()}`, JSON.stringify(leadData));
				console.log('💾 Lead salvo em sessionStorage (fallback)');
			} catch (e) {
				console.error('❌ Erro crítico ao salvar lead:', e);
			}
			return null;
		}
	}

	// ✅ Atualizar status de envio de email
	async function updateLeadEmailStatus(leadId: string, emailSent: boolean, attempts: number) {
		try {
			const leads = JSON.parse(localStorage.getItem('eloi_leads') || '[]');
			const updatedLeads = leads.map((lead: any) => {
				if (lead.id === leadId) {
					return {
						...lead,
						email_sent: emailSent,
						email_attempts: attempts,
						email_sent_at: emailSent ? new Date().toISOString() : undefined
					};
				}
				return lead;
			});
			localStorage.setItem('eloi_leads', JSON.stringify(updatedLeads, null, 2));
			// Atualizar backup individual
			const individualLead = JSON.parse(localStorage.getItem(`eloi_lead_${leadId}`) || '{}');
			if (individualLead.id) {
				individualLead.email_sent = emailSent;
				individualLead.email_attempts = attempts;
				individualLead.email_sent_at = emailSent ? new Date().toISOString() : undefined;
				localStorage.setItem(`eloi_lead_${leadId}`, JSON.stringify(individualLead, null, 2));
			}
		} catch (error) {
			console.error('❌ Erro ao atualizar status do email:', error);
		}
	}

	async function sendLeadToComercial(
		nome: string,
		telefone: string,
		email: string,
		contexto: string,
		historico: string
	) {
		console.log('\n🚨 ========== FUNÇÃO sendLeadToComercial INICIADA ==========');
		console.log('📥 Parâmetros recebidos:');
		console.log('  - Nome:', nome);
		console.log('  - Telefone:', telefone);
		console.log('  - Email:', email);
		console.log('  - Contexto:', contexto);
		console.log('  - Histórico (length):', historico.length, 'caracteres');
		console.log('===========================================================\n');
		
		const leadData = {
			nome,
			telefone,
			email,
			contexto,
			historico,
			data_hora: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
		};

		// 🔥 REDUNDÂNCIA 1: Salvar IMEDIATAMENTE no localStorage ANTES de tentar enviar email
		const leadId = await saveLeadToLocalStorage(leadData);
		console.log('✅ REDUNDÂNCIA ATIVADA - Lead salvo localmente:', leadId);

		// Salvar também como interação completa
		saveInteractionLog({
			type: 'lead_captured',
			lead_id: leadId,
			...leadData
		});

		try {
			console.log('\n🔍 ========== INÍCIO DO PROCESSO DE ENVIO DE EMAIL (PHP Backend) ==========');
			console.log('⏰ Timestamp:', new Date().toISOString());
			console.log('📧 Lead ID:', leadId);

			const payload = {
				name: nome,
				email: email,
				phone: telefone,
				message: historico,
				interest: contexto
			};

			console.log('📤 Enviando dados para o backend PHP:', payload);

			const response = await fetch('/api/send-email.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			});

			const responseData = await response.json();

			if (response.ok && responseData.status === 'success') {
				console.log('✅ Email enviado com sucesso via backend PHP!');
				if (leadId) {
					await updateLeadEmailStatus(leadId, true, 1);
				}
				return true;
			} else {
				console.error('❌ Erro ao enviar email via backend PHP:', responseData.message);
				if (leadId) {
					await updateLeadEmailStatus(leadId, false, 1);
				}
				return false;
			}
		} catch (error: any) {
			console.error('\n❌ ERRO CRÍTICO NO PROCESSO DE ENVIO (PHP Backend):');
			console.error('  - Tipo:', error?.name || 'Desconhecido');
			console.error('  - Mensagem:', error?.message || 'Sem mensagem');
			console.error('  - Stack:', error?.stack);
			console.log('\n💾 Lead está SEGURO no localStorage!');
			console.log('📋 Para exportar: exportLeads()');
			
			// Atualizar status mesmo em erro crítico
			if (leadId) {
				await updateLeadEmailStatus(leadId, false, 0);
			}
			
			// Expor funções globais
			(window as any).exportLeads = exportLeadsToJSON;
			(window as any).exportInteractions = exportInteractionsToJSON;
			(window as any).viewStats = () => {
				const leads = JSON.parse(localStorage.getItem('eloi_leads') || '[]');
				const interactions = JSON.parse(localStorage.getItem('eloi_interactions') || '[]');
				console.log('📊 ESTATÍSTICAS ELOI:');
				console.log(`  - Total de leads: ${leads.length}`);
				console.log(`  - Total de interações: ${interactions.length}`);
				console.log(`  - Leads com email enviado: ${leads.filter((l: any) => l.email_sent).length}`);
				console.log(`  - Leads sem email: ${leads.filter((l: any) => !l.email_sent).length}`);
			};
			
			console.log('\n🔚 ========== FUNÇÃO sendLeadToComercial FINALIZADA (COM ERRO) ==========\n');
			return false;
		} finally {
			console.log('\n🏁 ========== FUNÇÃO sendLeadToComercial COMPLETADA ==========\n');
		}
	}

	// 📥 Exportar leads para JSON
	function exportLeadsToJSON() {
		const leads = localStorage.getItem('eloi_leads');
		const blob = new Blob([leads || '[]'], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `eloi_leads_${new Date().toISOString().split('T')[0]}.json`;
		a.click();
		console.log('✅ Leads exportados com sucesso!');
	}

	// 📥 Exportar todas as interações para JSON
	function exportInteractionsToJSON() {
		const interactions = localStorage.getItem('eloi_interactions');
		const blob = new Blob([interactions || '[]'], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `eloi_interactions_${new Date().toISOString().split('T')[0]}.json`;
		a.click();
		console.log('✅ Interações exportadas com sucesso!');
	}

	async function sendAIMessage(
		message: string,
		nome_usuario: string,
		historico_conversa: string
	) {
		try {
			console.log('🤖 Enviando mensagem para API de chat (backend PHP)');

			const systemPrompt = `Você é ELOI, um vendedor virtual que responde de forma útil, cordial e objetiva. Mantenha o tom profissional e extraia sinais de interesse do usuário.`;

			const userPrompt = `Cliente: ${nome_usuario}\nMensagem: ${message}${historico_conversa ? `\n\nHistórico:\n${historico_conversa}` : ''}`;

			// Enviar a requisição para o backend PHP seguro (proxy para OpenAI)
			const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || '/api/chat.php';
			const apiResp = await fetch(CHAT_API_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message, nome: nome_usuario, historico: historico_conversa })
			});

			if (!apiResp.ok) {
				console.error('❌ Erro na API de chat:', apiResp.status);
				const err = await apiResp.json().catch(() => ({}));
				if (err && err.fallback) return { success: true, data: err.fallback };
				return {
					success: false,
					data: {
						resposta: `Desculpe ${nome_usuario}, estou com dificuldades no momento. Pode me passar seu telefone e email para continuarmos?`,
						interesse_detectado: true
					}
				};
			}

			const result = await apiResp.json().catch(() => ({}));
			const respostaGpt = result.data?.resposta?.trim() || '';
			const interesseDetectado = !!result.data?.interesse_detectado;

			return { success: true, data: { resposta: respostaGpt, interesse_detectado: interesseDetectado } };
		} catch (error) {
			console.error('Erro ao enviar mensagem:', error);
			return {
				success: false,
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
		
		// 📊 LOG: Chatbot aberto/fechado
		saveInteractionLog({
			type: eloiOpen ? 'chatbot_opened' : 'chatbot_closed',
			user_name: data.nome || 'Anônimo',
			current_step: step
		});

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
		console.log('\n🎯 ========== NOVA MENSAGEM ==========');
		console.log('📝 Texto:', text);
		console.log('📍 Step atual:', step);
		console.log('👤 Nome:', data.nome);
		console.log('📱 Telefone:', data.telefone);
		console.log('📧 Email:', data.email);
		console.log('======================================\n');
		
		addMessage(text, true);
		input = '';

		// 📊 LOG: Salvar interação do usuário
		saveInteractionLog({
			type: 'user_message',
			step: step,
			message: text,
			user_name: data.nome || 'Anônimo',
			conversation_history: history.slice(-10) // Últimas 10 mensagens
		});

		try {
			if (step === 'name') {
				if (containsName(text)) {
					// 🔍 DETECÇÃO INTELIGENTE: Verifica se o usuário já enviou contatos junto com o nome
					const extracted = extractContactInfo(text);
					
					// 🧹 EXTRAÇÃO INTELIGENTE DO NOME
					let cleanName = text;
					
					// Padrões comuns de apresentação
					const namePatterns = [
						/(?:meu nome é|me chamo|sou (?:o |a )?|eu sou (?:o |a )?)\s*([a-záàâãéèêíïóôõöúçñ\s]+?)(?:\s*(?:,|e|meu|minha|telefone|email|fone|cel|whats)|\s*$)/i,
						/(?:ola|olá|oi|bom dia|boa tarde|boa noite)[^,]*,?\s*(?:meu nome é|me chamo|sou|eu sou)\s*([a-záàâãéèêíïóôõöúçñ\s]+?)(?:\s*(?:,|e|meu|minha|telefone|email|fone|cel|whats)|\s*$)/i,
						/^([a-záàâãéèêíïóôõöúçñ]+(?:\s+[a-záàâãéèêíïóôõöúçñ]+)?)\s*(?:,|e|meu|minha|telefone|email|fone|cel|whats)/i
					];
					
					let nameFound = false;
					for (const pattern of namePatterns) {
						const match = text.match(pattern);
						if (match && match[1]) {
							cleanName = match[1].trim();
							// Remove palavras comuns que não são nome
							cleanName = cleanName
								.replace(/\b(ola|olá|oi|eloi|email|telefone|fone|cel|whats|meu|minha|é)\b/gi, '')
								.replace(/\s+/g, ' ')
								.trim();
							
							if (cleanName.length >= 2) {
								nameFound = true;
								break;
							}
						}
					}
					
					// Fallback: Se não encontrou com padrões, tenta remover contatos
					if (!nameFound && (extracted.phone || extracted.email)) {
						cleanName = text
							.replace(/\b\d{10,11}\b/g, '') // Remove telefone
							.replace(/[^\s@]+@[^\s@]+\.[^\s@]+/g, '') // Remove email
							.replace(/\b(email|telefone|fone|cel|whats|é|e|meu|minha)\b/gi, '') // Remove palavras-chave
							.replace(/\s+/g, ' ')
							.trim();
					}
					
					data.nome = cleanName;
					
					// Se encontrou contatos junto com o nome, captura imediatamente
					if (extracted.phone) {
						data.telefone = extracted.phone;
						console.log('📱 TELEFONE capturado na mensagem de nome:', data.telefone);
						saveInteractionLog({
							type: 'phone_captured_early',
							user_name: data.nome,
							phone: data.telefone,
							note: 'Capturado junto com o nome'
						});
					}
					
					if (extracted.email) {
						data.email = extracted.email;
						console.log('📧 EMAIL capturado na mensagem de nome:', data.email);
						saveInteractionLog({
							type: 'email_captured_early',
							user_name: data.nome,
							email: data.email,
							note: 'Capturado junto com o nome'
						});
					}
					
					// Se tem telefone E email, já envia o lead após a apresentação
					if (data.telefone && data.email) {
						console.log('🚀 Usuário enviou TUDO de uma vez! Enviando lead após apresentação...');
						
						step = 'chat';
						loading = true;
						
						await new Promise(resolve => setTimeout(resolve, 600));
						let res = await sendAIMessage(text, data.nome, '');
						loading = false;
						
						if (res.success) {
							addMessage(res.data.resposta);
						}
						
						// Aguarda um pouco para a IA responder antes de enviar o lead
						await new Promise(resolve => setTimeout(resolve, 1500));
						loading = true;
						
						console.log('📧 ENVIANDO LEAD COM DADOS COMPLETOS DESDE O INÍCIO!');
						await sendLeadToComercial(
							data.nome,
							data.telefone,
							data.email,
							'Forneceu dados completos logo no início',
							history.join('\n')
						);
						
						loading = false;
						addMessage(
							'Perfeito, '
								+ data.nome
								+ '! ✅\n\nRecebi todas as suas informações. Nosso time comercial vai analisar e entrar em contato em breve!\n\nObrigado! 🙏'
						);
						step = 'finished';
					} else {
						// Fluxo normal - continua conversa
						step = 'chat';
						loading = true;
						
						await new Promise(resolve => setTimeout(resolve, 600));
						let res = await sendAIMessage(text, data.nome, '');
						loading = false;
						
						if (res.success) {
							addMessage(res.data.resposta);
						}
					}
				} else {
					await new Promise(resolve => setTimeout(resolve, 600));
					addMessage('Qual é seu nome? 😊');
				}
			} else if (step === 'waiting_phone') {
				phoneAttempts++;
				
				// Tenta extrair telefone e email da mensagem
				const extracted = extractContactInfo(text);
				
				if (extracted.phone) {
					data.telefone = extracted.phone;
					phoneAttempts = 0; // Reset contador
					
					// 📊 LOG: Telefone capturado
					saveInteractionLog({
						type: 'phone_captured',
						user_name: data.nome || 'Anônimo',
						phone: data.telefone
					});
					
					// Se também encontrou email na mesma mensagem, captura tudo de uma vez
					if (extracted.email) {
						data.email = extracted.email;
						
						// 📊 LOG: Email capturado
						saveInteractionLog({
							type: 'email_captured',
							user_name: data.nome || 'Anônimo',
							email: data.email
						});
						
						loading = true;
						
						// Envia lead direto com ambos os dados
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
							'Excelente, '
								+ data.nome
								+ '! ✅\n\nRecebi seu telefone e email. Nosso time comercial vai analisar seu perfil e entrar em contato em breve!\n\nObrigado! 🙏'
						);
						step = 'finished';
					} else {
						// Só telefone, pede email
						step = 'waiting_email';
						await new Promise(resolve => setTimeout(resolve, 600));
						addMessage('Perfeito! Agora me passa seu email:');
					}
				} else if (phoneAttempts >= 3) {
					// Após 3 tentativas sem sucesso, aceita qualquer coisa como "telefone"
					data.telefone = text.trim() || 'Não fornecido';
					phoneAttempts = 0;
					
					// 📊 LOG: Telefone capturado (fallback)
					saveInteractionLog({
						type: 'phone_captured_fallback',
						user_name: data.nome || 'Anônimo',
						phone: data.telefone,
						note: 'Capturado após 3 tentativas sem validação'
					});
					
					step = 'waiting_email';
					await new Promise(resolve => setTimeout(resolve, 600));
					addMessage('Ok, anotado! Agora me passa seu email para continuarmos:');
				} else {
					// Não conseguiu extrair telefone, tenta novamente
					await new Promise(resolve => setTimeout(resolve, 600));
					addMessage('Pode me passar seu telefone com DDD? Ex: 11987654321');
				}
			} else if (step === 'waiting_email') {
				emailAttempts++;
				
				// Tenta extrair email (e telefone caso não tenha sido capturado ainda)
				const extracted = extractContactInfo(text);
				
				if (extracted.email) {
					data.email = extracted.email;
					emailAttempts = 0; // Reset contador
					
					// Se não tinha telefone ainda, tenta pegar também
					if (!data.telefone && extracted.phone) {
						data.telefone = extracted.phone;
						
						// 📊 LOG: Telefone capturado tardiamente
						saveInteractionLog({
							type: 'phone_captured',
							user_name: data.nome || 'Anônimo',
							phone: data.telefone
						});
					}
					
					// 📊 LOG: Email capturado
					saveInteractionLog({
						type: 'email_captured',
						user_name: data.nome || 'Anônimo',
						email: data.email
					});
					
					loading = true;
					
					await sendLeadToComercial(
						data.nome!,
						data.telefone || 'Não informado',
						data.email!,
						data.interesse || 'Não especificado',
						history.join('\n')
					);
					
					await new Promise(resolve => setTimeout(resolve, 1000));
					loading = false;
					
					addMessage(
						'Excelente, '
							+ data.nome
							+ '! ✅\n\nSeu interesse foi registrado e nosso time comercial vai analisar seu perfil.\n\nEles entram em contato com você em breve!\n\nObrigado! 🙏'
					);
					step = 'finished';
				} else if (emailAttempts >= 3) {
					// Após 3 tentativas sem sucesso, envia o lead mesmo sem email válido
					data.email = text.trim() || 'Não fornecido';
					emailAttempts = 0;
					
					// 📊 LOG: Email capturado (fallback)
					saveInteractionLog({
						type: 'email_captured_fallback',
						user_name: data.nome || 'Anônimo',
						email: data.email,
						note: 'Capturado após 3 tentativas sem validação - LEAD ENVIADO COM HISTÓRICO COMPLETO'
					});
					
					loading = true;
					
					// 🔥 ENVIA O LEAD MESMO SEM EMAIL VÁLIDO - O HISTÓRICO É VALIOSO!
					await sendLeadToComercial(
						data.nome!,
						data.telefone || 'Não informado',
						data.email!,
						data.interesse || 'Não especificado',
						history.join('\n')
					);
					
					await new Promise(resolve => setTimeout(resolve, 1000));
					loading = false;
					
					addMessage(
						'Perfeito, '
							+ data.nome
							+ '! ✅\n\nSuas informações foram registradas e nosso time comercial vai analisar a conversa.\n\nEles entram em contato com você em breve!\n\nObrigado! 🙏'
					);
					step = 'finished';
				} else {
					// Não conseguiu extrair email, tenta novamente
					await new Promise(resolve => setTimeout(resolve, 600));
					addMessage('Pode me passar seu email? Ex: seu@email.com');
				}
			} else if (step === 'chat' || step === 'finished') {
				console.log('\n🎯 ========== AUTO-DETECÇÃO DE CONTATOS (STEP: ' + step + ') ==========');
				
				// 🔒 VERIFICAÇÃO DE SEGURANÇA: Se está em 'finished' mas não tem dados completos, algo deu errado
				if (step === 'finished' && !data.email) {
					console.warn('⚠️ ALERTA: Step "finished" mas sem email! Forçando captura...');
					
					// Tenta extrair contatos da mensagem atual
					const extracted = extractContactInfo(text);
					
					if (extracted.email) {
						data.email = extracted.email;
						if (extracted.phone && !data.telefone) {
							data.telefone = extracted.phone;
						}
						
						loading = true;
						console.log('🚨 ENVIANDO LEAD DE RECUPERAÇÃO!');
						
						await sendLeadToComercial(
							data.nome || 'Anônimo',
							data.telefone || 'Não informado',
							data.email,
							data.interesse || 'Capturado em step finished',
							history.join('\n')
						);
						
						loading = false;
						addMessage('Perfeito! Recebi suas informações. Nosso time comercial vai analisar e entrar em contato! 🙏');
						return;
					} else {
						// Se não tem email, volta para waiting_email
						console.log('🔄 Revertendo para waiting_email para capturar dados faltantes');
						step = 'waiting_email';
						emailAttempts = 0;
						addMessage('Para finalizarmos, preciso do seu email. Pode me passar?');
						return;
					}
				}
				
				// 🔍 DETECÇÃO INTELIGENTE: Verifica se o usuário enviou contatos mesmo sem estar no step correto
				const extracted = extractContactInfo(text);
				console.log('🔍 Resultado da extração:', extracted);
				
				const hasContactInfo = extracted.phone || extracted.email;
				console.log('📋 Has contact info?', hasContactInfo);
				console.log('📋 Data atual:', { nome: data.nome, telefone: data.telefone, email: data.email });
				
				// Se encontrou contatos e ainda não tem AMBOS capturados
				if (hasContactInfo) {
					console.log('✅ Contato detectado! Processando...');
					let shouldSendLead = false;
					
					// Captura telefone se não tem
					if (extracted.phone && !data.telefone) {
						data.telefone = extracted.phone;
						console.log('📱 TELEFONE capturado automaticamente:', data.telefone);
						saveInteractionLog({
							type: 'phone_captured_auto',
							user_name: data.nome || 'Anônimo',
							phone: data.telefone,
							note: 'Capturado automaticamente durante conversa'
						});
					}
					
					// Captura email se não tem
					if (extracted.email && !data.email) {
						data.email = extracted.email;
						console.log('📧 EMAIL capturado automaticamente:', data.email);
						saveInteractionLog({
							type: 'email_captured_auto',
							user_name: data.nome || 'Anônimo',
							email: data.email,
							note: 'Capturado automaticamente durante conversa'
						});
						shouldSendLead = true; // Email é obrigatório para enviar
					}
					
					console.log('🔍 Verificando condições de envio:');
					console.log('  - shouldSendLead:', shouldSendLead);
					console.log('  - data.email:', data.email);
					console.log('  - Condição satisfeita?', shouldSendLead && data.email);
					
					// Se capturou email (com ou sem telefone), envia o lead IMEDIATAMENTE
					if (shouldSendLead && data.email) {
						loading = true;
						
						console.log('\n🚀 ========== ENVIANDO LEAD AUTOMATICAMENTE! ==========');
						console.log('📊 Dados capturados:', {
							nome: data.nome,
							telefone: data.telefone || 'Não informado',
							email: data.email,
							interesse: data.interesse || text.substring(0, 200)
						});
						
						try {
							await sendLeadToComercial(
									data.nome!,
									data.telefone || 'Não informado',
									data.email!,
									data.interesse || text.substring(0, 200),
								history.join('\n')
							);
							
							console.log('✅ sendLeadToComercial completou com sucesso!');
						} catch (error) {
							console.error('❌ Erro ao enviar lead:', error);
						}
						
						await new Promise(resolve => setTimeout(resolve, 1000));
						loading = false;
						
						addMessage(
							'Perfeito, '
								+ data.nome
								+ '! ✅\n\nRecebi suas informações e nosso time comercial vai analisar a conversa.\n\nEles entram em contato em breve!\n\nObrigado! 🙏'
						);
						step = 'finished';
						console.log('🏁 Step mudado para: finished');
						console.log('========== FIM DO ENVIO AUTOMÁTICO ==========\n');
						return; // ⚠️ CRÍTICO: PARA AQUI! Não continua o processamento da mensagem
					}
					
					// Se não tem email ainda, mas tem telefone, apenas captura
					console.log('⚠️ Condições não satisfeitas para envio automático.');
					console.log('   Motivo: shouldSendLead=' + shouldSendLead + ', email=' + !!data.email);
				}
				
				console.log('ℹ️Continuing fluxo normal da conversa...');
				console.log('========== FIM DA AUTO-DETECÇÃO ==========\n');
				
				// 🔄 Continua o fluxo normal da conversa (somente se não enviou lead)
				loading = true;
				
				await new Promise(resolve => setTimeout(resolve, 600));
				let res = await sendAIMessage(text, data.nome || 'Cliente', history.join('\n'));
				loading = false;
				
				if (res.success) {
					addMessage(res.data.resposta);
					
					if (res.data.interesse_detectado) {
						data.interesse = text;
						step = 'waiting_phone';
						
						// 🔥 CRÍTICO: Pede telefone imediatamente após detectar interesse
						await new Promise(resolve => setTimeout(resolve, 800));
						addMessage('Perfeito! Para que nosso time comercial entre em contato, preciso do seu telefone (com DDD):');
						
						console.log('📱 ========== INTERESSE DETECTADO ==========');
						console.log('  - Interesse:', data.interesse);
						console.log('  - Step mudou para: waiting_phone');
						console.log('  - Aguardando telefone do usuário...');
						console.log('===========================================\n');
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
		// 📊 LOG: Sessão iniciada
		saveInteractionLog({
			type: 'session_started',
			referrer: document.referrer || 'direct'
		});

		// Aguarda o evento de mockup completado
		const handleMockupCompleted = () => {
			// Só mostra widget automaticamente se usuário não clicou no botão
			if (!userClickedButton) {
				setTimeout(() => {
					showWidget = true;
					// Mostra a bolha 2 segundos após o widget aparecer
					setTimeout(() => {
						showBubble = true;
						// Atualiza a store para mostrar o hint
						chatbotReady.set(true);
					}, 2000);
				}, 1000);
			}
		};

		window.addEventListener('eloi-mockup-completed', handleMockupCompleted);
		
		// Mensagem inicial
		if (messages.length === 0) {
			addMessage(startMessage);
		}

		// Expor funções globais no console
		(window as any).exportLeads = exportLeadsToJSON;
		(window as any).exportInteractions = exportInteractionsToJSON;
		(window as any).viewStats = () => {
			const leads = JSON.parse(localStorage.getItem('eloi_leads') || '[]');
			const interactions = JSON.parse(localStorage.getItem('eloi_interactions') || '[]');
			console.log('📊 ESTATÍSTICAS ELOI:');
			console.log(`📧 Total de leads capturados: ${leads.length}`);
			console.log(`✅ Emails enviados com sucesso: ${leads.filter((l: any) => l.email_sent).length}`);
			console.log(`❌ Emails que falharam: ${leads.filter((l: any) => !l.email_sent).length}`);
			console.log(`💬 Total de interações: ${interactions.length}`);
			console.log('\n📋 Para exportar, digite:');
			console.log('  exportLeads() - Exporta leads');
			console.log('  exportInteractions() - Exporta todas as interações');
		};
		console.log('🤖 Eloi carregado! Digite viewStats() para ver estatísticas');

		return () => {
			window.removeEventListener('eloi-mockup-completed', handleMockupCompleted);
		};
	});
</script>

<!-- Wrapper sempre presente para scroll -->
<div data-chatbot-section class="pointer-events-none">
	{#if showWidget}
		<div class="fixed bottom-6 right-6 z-[999999] pointer-events-auto" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
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
</div>

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