# 📘 Guia de Personalização - Eloi

Este documento explica como personalizar os principais aspectos do projeto Eloi.

---

## 🤖 Personalidade do Chatbot Eloi

### Onde alterar a personalidade?

A personalidade do Eloi está definida no arquivo:

```
src/lib/components/ui/ChatbotEloi.svelte
```

### Mensagens Principais

#### 1. **Mensagem Inicial** (linha ~87)
```typescript
const startMessage =
    'Olá! 👋\n\nSou Eloi, seu vendedor virtual inteligente.\n\nQual é seu nome?';
```

**Como personalizar:** Altere o texto desta constante para modificar a primeira mensagem que o usuário vê ao abrir o chat.

---

#### 2. **Resposta de Boas-Vindas** (função `sendAIMessage`, linha ~62-75)
```typescript
resposta: `Muito prazer, ${nome_usuario}! 😊\n\nSou **Eloi**, seu vendedor virtual inteligente.\n\nDeixa eu ser honesto com você: a maioria das pessoas que chega aqui já ouviu falar de chatbots. Alguns gostam, outros têm receio. E é normal.\n\nMas aqui está a coisa: eu sou diferente. Não porque digo que sou. Mas porque EU PROVO.\n\nTrabalho **24/7** - Sem horário, sem limite, sem desculpas.\nVendo **muito bem** - 7 em cada 10 pessoas que falam comigo se tornam clientes.\nRespondo **na hora** - Nada de email respondido amanhã. Você precisa? Respondo AGORA.\nAprendo **sempre** - Minha IA analisa cada conversa e melhora continuamente.\nCusto **muito menos** que um vendedor tradicional - E ainda assim entrego MAIS resultado.\n\nMas sabe o que é mais importante? Eu NÃO vendo sonho. Eu vendo RESULTADO.\n\nEntão deixa eu fazer uma pergunta para você:\n\n**Qual é seu maior desafio com vendas AGORA?** Deixa eu te mostrar como eu poderia ajudar.`,
```

**Como personalizar:** Esta é a mensagem que aparece após o usuário informar o nome. Edite o texto dentro da propriedade `resposta` da função `sendAIMessage()`.

---

#### 3. **Bolha de Notificação** (linha ~195-198)
```svelte
<div class="text-blue-900 font-semibold text-sm">Olá! 👋</div>
<div class="text-blue-600 text-xs mt-1">Sou Eloi, estou aqui pra ajudar!</div>
```

**Como personalizar:** Altere o texto dessas divs para mudar a mensagem da bolha que aparece antes do usuário abrir o chat.

---

#### 4. **Título do Header** (linha ~225-227)
```svelte
<h3 class="text-white font-bold text-lg m-0">Eloi</h3>
<p class="text-blue-100 text-xs m-0 mt-1 flex items-center gap-2">
    <span class="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse shadow-sm"></span>
    Vendedor Virtual
</p>
```

**Como personalizar:** Altere "Eloi" e "Vendedor Virtual" conforme necessário.

---

### Mensagens de Validação

Encontre na função `handleSend()` (a partir da linha ~110):

```typescript
// Quando não reconhece o nome
addMessage('Qual é seu nome? 😊');

// Pedindo telefone
addMessage('Pode me passar seu telefone com DDD? Ex: 11987654321');

// Pedindo email
addMessage('Pode me passar seu email? Ex: seu@email.com');

// Confirmação final
addMessage(
    'Excelente, ' + data.nome + '! ✅\n\nSeu interesse foi registrado...'
);
```

---

## 🎨 Estilo Visual do Chatbot

### Cores Principais

O Eloi usa tons de **azul claro** para transmitir confiança e amigabilidade:

```css
/* Gradiente principal */
from-blue-400 to-blue-500

/* Backgrounds */
bg-blue-50 (fundo claro)
bg-white (mensagens do bot)

/* Bordas */
border-blue-100 (bordas suaves)

/* Textos */
text-blue-900 (texto escuro)
text-blue-600 (texto secundário)
```

**Onde alterar:** Busque por `blue-400`, `blue-500`, etc. no arquivo `ChatbotEloi.svelte` e substitua pelos códigos Tailwind da cor desejada.

---

### Bordas e Arredondamento

```css
rounded-3xl  /* Container principal e botão toggle (24px) */
rounded-2xl  /* Avatares, bolhas de mensagem, input (16px) */
rounded-20px /* Mensagens com cantos suaves */
```

**Como alterar:** Modifique as classes `rounded-*` para valores maiores (mais arredondado) ou menores (mais quadrado).

---

### Tamanhos

```css
/* Botão Toggle */
w-16 h-16 (64px × 64px)

/* Avatar Header */
w-12 h-12 (48px × 48px)

/* Avatar Mensagens */
w-9 h-9 (36px × 36px)

/* Container Chat */
w-[400px] h-[580px]
```

---

## 📄 Conteúdo do Site

### Pricing (Preços)

**Arquivo:** `src/lib/components/sections/Pricing.svelte`

Aqui você altera:
- Valores dos planos
- Nomes dos planos
- Recursos incluídos
- Botões de CTA

---

### How It Works (Como Funciona)

**Arquivo:** `src/lib/components/sections/HowItWorks.svelte`

Aqui você altera:
- Passos do processo
- Descrições de cada etapa
- Ícones e ilustrações

---

### FAQ (Perguntas Frequentes)

**Arquivo:** `src/lib/components/sections/FAQ.svelte`

Aqui você altera:
- Perguntas e respostas
- Adiciona ou remove itens do FAQ

---

### Hero Section (Seção Principal)

**Arquivo:** `src/routes/+page.svelte`

Aqui você altera:
- Título principal
- Subtítulo
- Botão de CTA principal

---

### SEO e Metadados

**Arquivo:** `src/lib/config/site.ts`

```typescript
export const siteConfig = {
    name: 'Eloi',
    description: '...',
    url: 'https://eloi.com.br',
    // etc.
}
```

---

## 🔧 Integração com Backend

### ✅ INTEGRAÇÃO ATIVA - OpenAI GPT-4o-mini

A integração com OpenAI está **FUNCIONANDO** através de SvelteKit API Routes:

#### Arquivos da API:

1. **`src/routes/api/chat/+server.ts`** → Chat com IA (OpenAI GPT-4o-mini)
2. **`src/routes/api/leads/+server.ts`** → Captura de leads

#### Configuração (`.env`):

```bash
VITE_OPENAI_API_KEY=sk-proj-YOUR_KEY_HERE
VITE_OPENAI_MODEL=gpt-4o-mini
VITE_LEAD_EMAIL=bruno.grupooc@gmail.com
```

⚠️ **IMPORTANTE:** O arquivo `.env` já foi criado com a chave do PHP. **NÃO COMMITE** este arquivo no Git!

---

### Como Funciona:

#### 1. **Chat com IA** (`/api/chat`)

Quando o usuário envia uma mensagem, o `ChatbotEloi.svelte` chama:

```typescript
const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        message: "Qual seu maior desafio?",
        nome_usuario: "João",
        historico_conversa: "..."
    })
});
```

A API retorna:

```json
{
    "success": true,
    "data": {
        "resposta": "Resposta da IA aqui...",
        "interesse_detectado": false
    }
}
```

---

#### 2. **Captura de Lead** (`/api/leads`)

Quando o usuário fornece telefone + email:

```typescript
const response = await fetch('/api/leads', {
    method: 'POST',
    body: JSON.stringify({
        nome: "João",
        telefone: "11987654321",
        email: "joao@email.com",
        contexto: "vendas",
        historico: "..."
    })
});
```

A API salva no console (você pode conectar com banco de dados ou email)

---

## 📱 Comportamento do Widget

### Quando o chatbot aparece?

O widget aparece após o usuário completar a visualização do **ChatMockup**.

**Arquivo:** `src/lib/components/ui/ChatMockup.svelte`

```typescript
// Dispara evento quando scroll >= 95%
if (scrollProgress >= 0.95 && allMessagesVisible) {
    window.dispatchEvent(new CustomEvent('eloi-mockup-completed'));
}
```

O `ChatbotEloi.svelte` escuta esse evento:

```typescript
window.addEventListener('eloi-mockup-completed', handleMockupCompleted);
```

---

### Timing da Bolha de Notificação

No `ChatbotEloi.svelte` (linha ~181):

```typescript
setTimeout(() => {
    showWidget = true;
    // Mostra a bolha 2 segundos após o widget aparecer
    setTimeout(() => {
        showBubble = true;
    }, 2000);
}, 1000);
```

**Como alterar:** Modifique os valores `2000` (2 segundos) e `1000` (1 segundo) conforme necessário.

---

## 🚀 Build e Deploy

### Desenvolvimento Local

```bash
npm run dev
```

### Build de Produção

```bash
npm run build
```

### Preview da Build

```bash
npm run preview
```

---

## 📧 Envio de Leads por Email

### ✅ CONFIGURADO - Resend

O envio de emails está **ATIVO** usando Resend:

#### Como Configurar:

1. **Crie uma conta gratuita no Resend:**
   - Acesse: https://resend.com
   - Cadastre-se (grátis para 100 emails/dia)
   - Obtenha sua API Key

2. **Configure o domínio (opcional mas recomendado):**
   - Adicione seu domínio no Resend
   - Configure os registros DNS (SPF, DKIM)
   - Valide o domínio

3. **Configure as variáveis de ambiente:**

Edite o arquivo `.env`:

```bash
# Resend Configuration
VITE_RESEND_API_KEY=re_SUA_CHAVE_AQUI
VITE_EMAIL_FROM=Eloi <noreply@seudominio.com>
VITE_LEAD_EMAIL=bruno.grupooc@gmail.com
```

4. **Teste o envio:**

Quando um lead for capturado, você receberá um email com:
- 🔥 Nome, telefone, email
- 🎯 Contexto do interesse
- 💬 Histórico completo da conversa
- ⏰ Data e hora da captura

---

### 📬 Formato do Email

```
🔥 LEAD QUENTE - Eloi - João Silva

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 DADOS:
👤 Nome: João Silva
📱 Telefone: 11987654321
📧 Email: joao@email.com
🎯 Interesse: Automatizar vendas

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 HISTÓRICO DA CONVERSA:

Você: João Silva
Eloi: Muito prazer, João!...
Você: Quero automatizar vendas...
...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ Data/Hora: 13/11/2025 15:30:45
🤖 Capturado por: Eloi
🚨 AÇÃO IMEDIATA: Entre em contato!
```

---

### 🔧 Alternativas ao Resend:

Se preferir outro serviço, edite `src/routes/api/leads/+server.ts`:

#### SendGrid:
```bash
npm install @sendgrid/mail
```

#### Nodemailer:
```bash
npm install nodemailer
```

#### Postmark:
```bash
npm install postmark
```

---

## 📂 Estrutura de Pastas

```
Eloi/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── sections/      # Seções da landing page
│   │   │   └── ui/            # Componentes UI (ChatbotEloi, etc.)
│   │   └── config/
│   │       └── site.ts        # Configurações gerais
│   └── routes/
│       ├── api/               # ✅ API Routes (NOVO)
│       │   ├── chat/          # Endpoint de chat com IA
│       │   │   └── +server.ts
│       │   └── leads/         # Endpoint de captura de leads
│       │       └── +server.ts
│       └── +page.svelte       # Página principal
├── static/                    # Arquivos estáticos
├── .env                       # ✅ Variáveis de ambiente (NÃO COMMITAR)
├── .env.example               # Exemplo de configuração
└── package.json
```

---

## 💡 Dicas de Personalização

### Tom de Voz

O Eloi atual usa um tom:
- **Direto e confiante** ("EU PROVO")
- **Dados concretos** ("7 em cada 10 pessoas")
- **Transparente** ("Deixa eu ser honesto")
- **Focado em resultados** ("Eu NÃO vendo sonho. Eu vendo RESULTADO")

Para alterar o tom, edite as mensagens seguindo seu guia de estilo.

---

### Emojis

Use com moderação para manter profissionalismo:
- ✅ Olá! 👋 (boas-vindas)
- ✅ Excelente! ✅ (confirmação)
- ✅ Obrigado! 🙏 (finalização)

---

### Formatação Markdown

O chatbot suporta **Markdown básico** nas mensagens:

```typescript
**texto em negrito**
*texto em itálico*
\n\n (quebra de linha dupla para parágrafos)
```

---

## 🐛 Resolução de Problemas

### O chatbot não aparece?

1. Verifique se o `ChatMockup` está disparando o evento
2. Abra o console e veja se há erros
3. Confirme que `showWidget` está sendo setado para `true`

### As cores não mudaram?

1. Limpe o cache do navegador
2. Rode `npm run build` novamente
3. Verifique se está usando classes Tailwind válidas

### As mensagens não estão aparecendo?

1. Verifique a função `addMessage()`
2. Confirme que o `messagesContainer` está sendo bindado corretamente
3. Veja o console para possíveis erros

---

## 📞 Suporte

Para dúvidas técnicas ou personalizações avançadas, consulte:
- Documentação do SvelteKit: https://kit.svelte.dev/
- Documentação do Tailwind CSS: https://tailwindcss.com/

---

**Última atualização:** 13 de novembro de 2025
