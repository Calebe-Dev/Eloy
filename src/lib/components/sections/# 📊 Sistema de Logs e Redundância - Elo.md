# 📊 Sistema de Logs e Redundância - Eloi

## Implementação Completa

Sistema de dupla redundância implementado no ChatbotEloi para **garantir que nenhuma interação seja perdida**, mesmo se o envio de email falhar.

---

## 🔥 Funcionalidades Implementadas

### 1. **Logs de Todas as Interações** (`eloi_interactions`)
Salva TODAS as ações do usuário, incluindo:

- ✅ **Sessão iniciada** - Quando o usuário acessa o site
- ✅ **Chatbot aberto/fechado** - Cada vez que o usuário interage com o widget
- ✅ **Mensagens enviadas** - Cada mensagem do usuário com contexto da conversa
- ✅ **Telefone capturado** - Quando o usuário fornece o telefone
- ✅ **Email capturado** - Quando o usuário fornece o email
- ✅ **Lead capturado** - Quando o formulário completo é preenchido

**Estrutura do Log:**
```json
{
  "id": "int_1731628392847_k3j2h9d",
  "type": "user_message",
  "step": "chat",
  "message": "Quero automatizar vendas",
  "user_name": "João Silva",
  "conversation_history": ["Você: Olá", "Eloi: Olá! Como posso ajudar?"],
  "timestamp": "2025-11-15T14:33:12.847Z",
  "data_hora_br": "15/11/2025 11:33:12",
  "user_agent": "Mozilla/5.0...",
  "url": "https://digital.grupooc.com.br/"
}
```

---

### 2. **Logs de Leads Capturados** (`eloi_leads`)
Redundância completa dos dados que seriam enviados por email:

**Estrutura do Lead:**
```json
{
  "id": "lead_1731628450123_x9f3k2m",
  "nome": "João Silva",
  "telefone": "11987654321",
  "email": "joao@email.com",
  "contexto": "Automatizar vendas",
  "historico": "Você: Olá\nEloi: Olá! Como posso ajudar?\n...",
  "data_hora": "15/11/2025 11:34:10",
  "timestamp": "2025-11-15T14:34:10.123Z",
  "data_hora_br": "15/11/2025 11:34:10",
  "user_agent": "Mozilla/5.0...",
  "url": "https://digital.grupooc.com.br/",
  "email_sent": true,
  "email_attempts": 2,
  "email_sent_at": "2025-11-15T14:34:11.456Z"
}
```

**Cada lead é salvo em DOIS lugares:**
1. Array `eloi_leads` (todos os leads juntos)
2. Item individual `eloi_lead_{id}` (backup separado)

---

### 3. **Sistema de Retry com Exponential Backoff**
O sistema tenta enviar o email até **3 vezes** antes de desistir:

- **Tentativa 1**: Imediata
- **Tentativa 2**: Aguarda 1 segundo
- **Tentativa 3**: Aguarda 2 segundos

**Mesmo se todas as tentativas falharem**, o lead está **garantido no localStorage**.

---

### 4. **Funções Globais no Console**

Digite no console do navegador:

```javascript
// Ver estatísticas completas
viewStats()

// Exportar todos os leads para JSON
exportLeads()

// Exportar todas as interações para JSON
exportInteractions()
```

**Output de `viewStats()`:**
```
📊 ESTATÍSTICAS ELOI:
📧 Total de leads capturados: 15
✅ Emails enviados com sucesso: 13
❌ Emails que falharam: 2
💬 Total de interações: 142

📋 Para exportar, digite:
  exportLeads() - Exporta leads
  exportInteractions() - Exporta todas as interações
```

---

## 📥 Exportação de Dados

### `exportLeads()`
Baixa arquivo: `eloi_leads_2025-11-15.json`

Contém:
- Todos os leads capturados
- Status de envio de email
- Tentativas de envio
- Dados completos do usuário
- Histórico da conversa

### `exportInteractions()`
Baixa arquivo: `eloi_interactions_2025-11-15.json`

Contém:
- Todas as interações do usuário
- Sessões iniciadas
- Chatbot aberto/fechado
- Mensagens enviadas
- Dados capturados (telefone, email)
- Timestamps completos

---

## 🔒 Redundância e Segurança

### Camadas de Proteção:

1. **localStorage principal** (`eloi_leads` e `eloi_interactions`)
2. **localStorage backup individual** (`eloi_lead_{id}`)
3. **sessionStorage fallback** (se localStorage falhar)
4. **Console logs detalhados** (para debug)
5. **Email com retry automático** (3 tentativas)

### Cenários Cobertos:

✅ Email falha → Lead salvo no localStorage  
✅ localStorage cheio → Salva no sessionStorage  
✅ Rede offline → Dados garantidos localmente  
✅ API Resend fora do ar → Lead não é perdido  
✅ Navegador fecha → Dados persistem (localStorage)  
✅ SessionStorage expira → Dados principais em localStorage

---

## 📊 Tipos de Logs Capturados

| Tipo | Descrição | Dados Salvos |
|------|-----------|--------------|
| `session_started` | Usuário acessa o site | referrer, timestamp, user_agent, url |
| `chatbot_opened` | Chatbot é aberto | user_name, current_step, timestamp |
| `chatbot_closed` | Chatbot é fechado | user_name, current_step, timestamp |
| `user_message` | Mensagem enviada | step, message, user_name, conversation_history |
| `phone_captured` | Telefone fornecido | user_name, phone, timestamp |
| `email_captured` | Email fornecido | user_name, email, timestamp |
| `lead_captured` | Lead completo | nome, telefone, email, contexto, historico |

---

## 🚀 Como Usar

### Para Desenvolvedores:

1. **Monitorar em tempo real:**
   ```javascript
   // Abra o console e veja os logs
   // Cada ação mostra emojis coloridos:
   // 📊 Interação salva
   // 💾 Lead salvo em localStorage
   // 📧 Tentativa de envio de email
   // ✅ Email enviado com sucesso
   // ❌ Erro ao enviar email
   ```

2. **Exportar dados:**
   ```javascript
   exportLeads()           // JSON com todos os leads
   exportInteractions()    // JSON com todas as interações
   viewStats()             // Estatísticas resumidas
   ```

### Para Administradores:

1. Acesse o site de produção: `https://digital.grupooc.com.br`
2. Abra o console do navegador (F12)
3. Digite `viewStats()` para ver quantos leads foram capturados
4. Digite `exportLeads()` para baixar o arquivo JSON
5. Abra o JSON em qualquer editor de texto

---

## 📧 Email vs JSON

### O que acontece quando um usuário preenche o formulário:

1. **PRIMEIRO**: Dados salvos em `localStorage` (GARANTIDO)
2. **SEGUNDO**: Tentativa de enviar email (até 3 vezes)
3. **Se email falha**: Console mostra mensagem com ID do lead
4. **Se email sucesso**: Flag `email_sent: true` no localStorage

**Resultado:** Você NUNCA perde um lead, mesmo se o email falhar!

---

## 🔍 Diferença entre Interações e Leads

### `eloi_interactions` (Todas as Interações)
- Sessões iniciadas
- Chatbot aberto/fechado
- Mensagens enviadas
- **Usuários que NÃO viraram lead**
- Telefones/emails capturados isoladamente

**Use para:** Análise de comportamento, taxa de conversão, debugging

### `eloi_leads` (Leads Completos)
- Apenas usuários que preencheram: nome, telefone E email
- Histórico completo da conversa
- Status de envio de email
- **Leads qualificados**

**Use para:** Comercial, follow-up, métricas de vendas

---

## 💡 Exemplos de Uso

### Cenário 1: API Resend está fora do ar
```
User preenche formulário
↓
✅ Lead salvo no localStorage (ID: lead_123)
↓
❌ Tentativa 1 de email: FALHOU
❌ Tentativa 2 de email: FALHOU
❌ Tentativa 3 de email: FALHOU
↓
Console: "❌ Todas as tentativas falharam"
Console: "✅ Mas o lead está SALVO com ID: lead_123"
Console: "📋 Digite: exportLeads()"
↓
Você exporta o JSON e tem o lead completo!
```

### Cenário 2: Análise de comportamento
```javascript
// Exportar todas as interações
exportInteractions()

// Abrir JSON e filtrar por tipo
// Quantas sessões? → type: "session_started"
// Quantos abriram o chatbot? → type: "chatbot_opened"
// Taxa de conversão? → leads / sessions
```

---

## 🎯 Próximos Passos (Opcional)

1. **Dashboard Admin** - Interface visual para visualizar leads
2. **Webhook Zapier** - Enviar para Google Sheets automaticamente
3. **Limpeza automática** - Remover logs com mais de 90 dias
4. **Exportação agendada** - Email diário com novos leads

---

## ✅ Status

- ✅ Sistema de logs completo
- ✅ Redundância em localStorage
- ✅ Retry com exponential backoff
- ✅ Funções de exportação
- ✅ Console logs detalhados
- ✅ Fallback para sessionStorage
- ✅ Build funcionando sem erros

**Tudo pronto para produção!** 🚀
