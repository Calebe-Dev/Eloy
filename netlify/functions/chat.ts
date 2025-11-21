import type { Handler, HandlerEvent } from '@netlify/functions';

export const handler: Handler = async (event: HandlerEvent) => {
	// Só aceita POST
	if (event.httpMethod !== 'POST') {
		return {
			statusCode: 405,
			body: JSON.stringify({ error: 'Method not allowed' })
		};
	}

	try {
		const { message, nome, historico } = JSON.parse(event.body || '{}');
		
		if (!message) {
			return {
				statusCode: 400,
				body: JSON.stringify({ error: 'Mensagem é obrigatória' })
			};
		}

		const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
		const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

		if (!OPENAI_API_KEY) {
			console.error('❌ OPENAI_API_KEY não configurada');
			return {
				statusCode: 500,
				body: JSON.stringify({ 
					error: 'API key não configurada',
					fallback: {
						resposta: `Desculpe ${nome || 'cliente'}, estou com dificuldades no momento. Pode me passar seu telefone e email para continuarmos?`,
						interesse_detectado: true
					}
				})
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

		const userPrompt = `Cliente: ${nome || 'visitante'}\nMensagem: ${message}${
			historico ? `\n\nHistórico:\n${historico}` : ''
		}`;

		console.log('🤖 Chamando OpenAI API...');
		
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
			console.error('❌ Erro OpenAI:', errorData);
			
			return {
				statusCode: response.status,
				body: JSON.stringify({
					error: 'Erro ao processar mensagem',
					fallback: {
						resposta: `Desculpe ${nome || 'cliente'}, estou com dificuldades no momento. Pode me passar seu telefone e email para continuarmos?`,
						interesse_detectado: true
					}
				})
			};
		}

		const data = await response.json();
		const respostaCompleta = data.choices[0]?.message?.content || '';

		// Detectar marcador de interesse no prompt
		let interesseDetectado = false;
		let resposta = respostaCompleta;

		if (respostaCompleta.includes('[INTERESSE_DETECTADO]')) {
			interesseDetectado = true;
			resposta = respostaCompleta
				.replace(/\[INTERESSE_DETECTADO\]/g, '')
				.replace(/\[FIM_INTERESSE_DETECTADO\]/g, '')
				.trim();
		}

		// Se não há marcador, detectar interesse baseado em palavras-chave
		if (!interesseDetectado) {
			const palavrasInteresse = [
				'sim', 'quero', 'preciso', 'gostaria', 'interesse', 
				'como funciona', 'quanto custa', 'preço', 'orçamento',
				'pode', 'consegue', 'ajudar', 'mais informações'
			];
			
			const mensagemLower = message.toLowerCase();
			interesseDetectado = palavrasInteresse.some(palavra => 
				mensagemLower.includes(palavra)
			);
		}

		console.log('✅ Resposta gerada com sucesso');

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache'
			},
			body: JSON.stringify({
				success: true,
				data: {
					resposta,
					interesse_detectado: interesseDetectado
				}
			})
		};

	} catch (error) {
		console.error('❌ Erro na função:', error);
		
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: 'Erro interno',
				fallback: {
					resposta: 'Desculpe, ocorreu um erro. Como posso te ajudar de outra forma?',
					interesse_detectado: false
				}
			})
		};
	}
};
