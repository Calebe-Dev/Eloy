# 📧 Configuração de Email - Resend

## ✅ Status: IMPLEMENTADO

O sistema de envio de emails está **ATIVO** e configurado com Resend.

---

## 🚀 Como Configurar (Passo a Passo)

### 1. Criar Conta no Resend

1. Acesse: **https://resend.com**
2. Clique em **"Sign Up"** (gratuito)
3. Confirme seu email
4. Faça login no dashboard

---

### 2. Obter API Key

1. No dashboard do Resend, vá em **"API Keys"**
2. Clique em **"Create API Key"**
3. Dê um nome (ex: "Eloi Production")
4. Copie a chave que começa com `re_...`

⚠️ **IMPORTANTE:** Guarde essa chave em local seguro! Ela só aparece uma vez.

---

### 3. Configurar Variáveis de Ambiente

Edite o arquivo `.env` na raiz do projeto:

```bash
# Resend Configuration
VITE_RESEND_API_KEY=re_SUA_CHAVE_AQUI
VITE_EMAIL_FROM=Eloi <noreply@seudominio.com>
VITE_LEAD_EMAIL=bruno.grupooc@gmail.com
```

**Substitua:**
- `re_SUA_CHAVE_AQUI` → Sua API Key do Resend
- `noreply@seudominio.com` → Seu domínio verificado (ou use `onboarding@resend.dev` para testes)
- `bruno.grupooc@gmail.com` → Email que receberá os leads

---

### 4. Verificar Domínio (Opcional mas Recomendado)

Para usar seu próprio domínio (ex: `noreply@eloi.com.br`):

1. No Resend, vá em **"Domains"**
2. Clique em **"Add Domain"**
3. Digite seu domínio (ex: `eloi.com.br`)
4. Copie os registros DNS fornecidos
5. Adicione os registros no seu provedor de DNS:
   - **SPF** (TXT)
   - **DKIM** (TXT)
   - **DMARC** (TXT)
6. Aguarde validação (pode levar até 24h)

**Exemplo de registros DNS:**

```
Tipo: TXT
Nome: @ (ou domínio raiz)
Valor: v=spf1 include:_spf.resend.com ~all

Tipo: TXT
Nome: resend._domainkey
Valor: [valor fornecido pelo Resend]
```

---

### 5. Testar o Envio

#### Teste Local:

1. Rode o projeto:
   ```bash
   npm run dev
   ```

2. Abra o chatbot no navegador

3. Complete o fluxo até fornecer:
   - Nome
   - Telefone
   - Email

4. Verifique o console do servidor:
   ```
   🔥 NOVO LEAD CAPTURADO: { nome: "...", telefone: "...", email: "..." }
   ✅ Email enviado com sucesso
   ```

5. Verifique sua caixa de entrada (bruno.grupooc@gmail.com)

---

## 📬 O que o Email Contém?

Quando um lead é capturado, você recebe:

```
Assunto: 🔥 LEAD QUENTE - Eloi - João Silva

Corpo:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 DADOS DO LEAD:
👤 Nome: João Silva
📱 Telefone: (11) 98765-4321
📧 Email: joao@email.com
🎯 Interesse: Automatizar vendas

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 HISTÓRICO COMPLETO DA CONVERSA:

Você: João Silva
Eloi: Muito prazer, João! Sou Eloi...
Você: Quero automatizar vendas
Eloi: Ótimo! A automação libera sua equipe...
[conversa completa]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ Data/Hora: 13/11/2025 15:30:45
🤖 Capturado por: Eloi
🚨 AÇÃO IMEDIATA: Entre em contato!
```

---

## 🔍 Monitoramento de Emails

### No Dashboard do Resend:

1. Acesse **"Emails"** no menu
2. Veja todos os emails enviados
3. Status de entrega (delivered, bounced, etc.)
4. Logs completos de cada envio

---

## ⚠️ Limites do Plano Gratuito

O Resend oferece **100 emails/dia GRÁTIS**:

- ✅ Perfeito para começar
- ✅ Sem cartão de crédito necessário
- ✅ Todos os recursos disponíveis

Se precisar de mais, veja os planos pagos em: https://resend.com/pricing

---

## 🐛 Problemas Comuns

### Email não chega?

1. **Verifique o console:**
   ```
   ⚠️ RESEND_API_KEY não configurada - email não enviado
   ```
   → Configure a variável `VITE_RESEND_API_KEY`

2. **Erro de autenticação:**
   ```
   ❌ Erro Resend: Invalid API key
   ```
   → Verifique se copiou a chave corretamente

3. **Email vai para SPAM:**
   → Verifique seu domínio no Resend
   → Configure SPF, DKIM, DMARC

4. **Email bounce:**
   → Verifique se o email de destino existe
   → Verifique no dashboard do Resend

---

## 🔒 Segurança

### ✅ Boas Práticas:

1. **NUNCA** commite o arquivo `.env` no Git
2. Use variáveis de ambiente em produção
3. Rotacione a API Key periodicamente
4. Monitore o uso no dashboard

### Variáveis de Produção:

Em **Vercel/Netlify**, configure:

```
VITE_RESEND_API_KEY = re_sua_chave_producao
VITE_EMAIL_FROM = Eloi <noreply@eloi.com.br>
VITE_LEAD_EMAIL = bruno.grupooc@gmail.com
```

---

## 📊 Métricas Importantes

No dashboard do Resend, monitore:

- **Taxa de entrega** (delivery rate)
- **Taxa de abertura** (open rate)
- **Taxa de bounce** (bounce rate)
- **Reclamações de spam** (spam complaints)

Meta ideal:
- ✅ Entrega: > 95%
- ✅ Bounce: < 5%
- ✅ Spam: < 0.1%

---

## 🆘 Suporte

- **Resend Docs:** https://resend.com/docs
- **Resend Support:** support@resend.com
- **Status:** https://status.resend.com

---

## 🎯 Próximos Passos

Após configurar o email, você pode:

1. **Integrar com CRM** (HubSpot, Pipedrive)
2. **Salvar leads em banco** (Supabase, PostgreSQL)
3. **Criar automações** (Make, Zapier)
4. **Configurar notificações** (Slack, Discord)

---

**Configuração criada em:** 13/11/2025
**Status:** ✅ Pronto para uso
