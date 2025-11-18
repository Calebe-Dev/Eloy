# 🔍 Sistema de Logs Detalhados - Diagnóstico de Emails

## Implementado com Sucesso! ✅

Sistema completo de rastreamento e diagnóstico para envio de emails via Resend API.

---

## 📊 O que foi implementado:

### 1. **Logs de Início de Processo**
```
🔍 ========== INÍCIO DO PROCESSO DE ENVIO DE EMAIL ==========
⏰ Timestamp: 2025-11-15T14:33:12.847Z
📧 Lead ID: lead_1731628392847_k3j2h9d
```

### 2. **Verificação de Variáveis de Ambiente**
```
🔑 Verificando variáveis de ambiente...
  - VITE_RESEND_API_KEY: Configurada (re_AbCd...)
  - VITE_LEAD_EMAIL: bruno.grupooc@gmail.com
```

**Se API Key não configurada:**
```
❌ ERRO CRÍTICO: RESEND_API_KEY não configurada!
📝 Ação necessária:
  1. Criar arquivo .env na raiz do projeto
  2. Adicionar: VITE_RESEND_API_KEY=sua_chave_aqui
  3. Reiniciar o servidor de desenvolvimento
```

---

## 🔄 Logs de Tentativas de Envio

### Cada tentativa mostra:

```
📧 ========== TENTATIVA 1/3 ==========
⏰ Timestamp tentativa: 2025-11-15T14:33:13.123Z
📤 Enviando request para Resend API...
  - Endpoint: https://api.resend.com/emails
  - From: Eloi <onboarding@resend.dev>
  - To: ['bruno.grupooc@gmail.com']
  - Subject: 🔥 LEAD QUENTE - Eloi - João Silva
  - Body length: 542 caracteres
📊 Response recebido em 234.56ms
  - Status: 200 OK
  - Headers: {...}
```

---

## ❌ Diagnóstico de Erros

### Erro 401 - Autenticação
```
🔐 ERRO DE AUTENTICAÇÃO (401):
  - API Key pode estar inválida ou expirada
  - Verifique se VITE_RESEND_API_KEY está correta
  - Acesse: https://resend.com/api-keys
```

### Erro 403 - Permissão
```
🚫 ERRO DE PERMISSÃO (403):
  - API Key não tem permissão para enviar emails
  - Verifique as configurações da conta Resend
```

### Erro 422 - Validação
```
📝 ERRO DE VALIDAÇÃO (422):
  - Dados do email inválidos
  - Verifique formato do email destinatário: invalid@email
  - Error details: { message: "..." }
```

### Erro 429 - Rate Limit
```
⏱️ RATE LIMIT EXCEDIDO (429):
  - Muitos emails enviados em pouco tempo
  - Aguarde alguns minutos antes de tentar novamente
```

### Erro 500+ - Servidor
```
🔥 ERRO DO SERVIDOR RESEND (5xx):
  - Problema no servidor da Resend
  - Verifique status: https://resend.com/status
```

### Erro de Rede
```
❌ ERRO DE REDE NA TENTATIVA 1
📋 Detalhes:
  - Tipo: NetworkError
  - Mensagem: Failed to fetch
  - Stack: Error at...

🌐 POSSÍVEL PROBLEMA DE REDE:
  - Verifique a conexão com a internet
  - Firewall pode estar bloqueando api.resend.com
  - CORS pode estar bloqueando a requisição
```

### Erro de Timeout
```
⏱️ TIMEOUT:
  - Requisição demorou muito tempo
  - Verifique velocidade da conexão
```

---

## ✅ Logs de Sucesso

```
✅ ========== EMAIL ENVIADO COM SUCESSO! ==========
🎉 Tentativa 2/3 bem-sucedida!
📊 Resposta da API: { id: "abc123", ... }
📧 Destinatário: bruno.grupooc@gmail.com
👤 Lead: João Silva (ID: lead_1731628392847_k3j2h9d)
⏰ Enviado em: 15/11/2025 11:33:14
💾 Status atualizado no localStorage
================================================
```

---

## 🔄 Sistema de Retry

### Exponential Backoff:
```
⏳ Aguardando 1000ms antes da próxima tentativa...  (tentativa 1)
⏳ Aguardando 2000ms antes da próxima tentativa...  (tentativa 2)
```

---

## 📉 Resumo de Falha

**Se todas as tentativas falharem:**
```
❌ ========== FALHA NO ENVIO DE EMAIL ==========
📊 Resumo:
  - Tentativas realizadas: 3/3
  - Status final: FALHOU
  - Lead ID: lead_1731628392847_k3j2h9d
  - Nome: João Silva
  - Email destino: bruno.grupooc@gmail.com

🔧 PRÓXIMOS PASSOS:
  1. Verifique os erros acima para diagnóstico
  2. Lead SALVO no localStorage (ID: lead_...)
  3. Digite exportLeads() para exportar manualmente
  4. Entre em contato com suporte se problema persistir
================================================

💾 Status de falha salvo no localStorage
```

---

## 🚨 Erros Críticos Inesperados

```
❌ ========== ERRO CRÍTICO INESPERADO ==========
🔥 Um erro inesperado ocorreu fora do fluxo normal:
  - Tipo: TypeError
  - Mensagem: Cannot read property...
  - Stack: Error at...

💾 DADOS PROTEGIDOS:
  - Lead ID: lead_1731628392847_k3j2h9d
  - Status: SALVO no localStorage
  - Digite exportLeads() para recuperar

📞 SUPORTE:
  - Copie esta mensagem de erro completa
  - Entre em contato com o desenvolvedor
  - Inclua o Lead ID: lead_...
================================================
```

---

## 🎯 Como Usar para Diagnóstico

### 1. **Monitorar em Tempo Real**
Abra o console do navegador (F12) e observe os logs enquanto testa o chatbot.

### 2. **Identificar Problemas**
Os logs mostram exatamente onde e por que o envio falhou:
- **API Key inválida?** → Erro 401
- **Email inválido?** → Erro 422
- **Sem internet?** → NetworkError
- **Servidor fora?** → Erro 5xx

### 3. **Verificar Configuração**
Logo no início do processo, veja se as variáveis estão configuradas:
```
✅ VITE_RESEND_API_KEY: Configurada
✅ VITE_LEAD_EMAIL: bruno.grupooc@gmail.com
```

### 4. **Analisar Performance**
Veja quanto tempo cada tentativa levou:
```
📊 Response recebido em 234.56ms
```

### 5. **Exportar Leads Não Enviados**
Se emails falharem, os leads estão salvos:
```javascript
exportLeads() // Baixa JSON com todos os leads
viewStats()   // Ver quantos falharam
```

---

## 📋 Checklist de Troubleshooting

Quando um email falha, siga esta ordem:

1. ✅ **Verificar variáveis de ambiente**
   - VITE_RESEND_API_KEY está configurada?
   - Valor está correto?

2. ✅ **Verificar conta Resend**
   - API Key é válida?
   - Conta está ativa?
   - Não ultrapassou limite de envios?

3. ✅ **Verificar rede**
   - Internet está funcionando?
   - Firewall bloqueando api.resend.com?
   - CORS configurado corretamente?

4. ✅ **Verificar formato de dados**
   - Email destinatário é válido?
   - Dados do lead estão completos?

5. ✅ **Verificar servidor Resend**
   - Acesse: https://resend.com/status
   - API está online?

---

## 🔍 Exemplo de Log Completo

### Cenário: Sucesso na 2ª tentativa

```
🔍 ========== INÍCIO DO PROCESSO DE ENVIO DE EMAIL ==========
⏰ Timestamp: 2025-11-15T14:33:12.847Z
📧 Lead ID: lead_1731628392847_k3j2h9d
🔑 Verificando variáveis de ambiente...
  - VITE_RESEND_API_KEY: Configurada (re_AbCd...)
  - VITE_LEAD_EMAIL: bruno.grupooc@gmail.com

📧 ========== TENTATIVA 1/3 ==========
⏰ Timestamp tentativa: 2025-11-15T14:33:13.123Z
📤 Enviando request para Resend API...
  - Endpoint: https://api.resend.com/emails
  - From: Eloi <onboarding@resend.dev>
  - To: ['bruno.grupooc@gmail.com']
  - Subject: 🔥 LEAD QUENTE - Eloi - João Silva
  - Body length: 542 caracteres

❌ ERRO DE REDE NA TENTATIVA 1
📋 Detalhes:
  - Tipo: NetworkError
  - Mensagem: Failed to fetch
⏳ Aguardando 1000ms antes da próxima tentativa...

📧 ========== TENTATIVA 2/3 ==========
⏰ Timestamp tentativa: 2025-11-15T14:33:14.234Z
📤 Enviando request para Resend API...
📊 Response recebido em 156.78ms
  - Status: 200 OK

✅ ========== EMAIL ENVIADO COM SUCESSO! ==========
🎉 Tentativa 2/3 bem-sucedida!
📊 Resposta da API: { id: "abc123" }
📧 Destinatário: bruno.grupooc@gmail.com
👤 Lead: João Silva (ID: lead_1731628392847_k3j2h9d)
⏰ Enviado em: 15/11/2025 11:33:14
💾 Status atualizado no localStorage
================================================

✅ Processo finalizado com SUCESSO!
========== FIM DO PROCESSO ==========
```

---

## ✅ Benefícios

1. **🔍 Diagnóstico Rápido**: Identifique problemas em segundos
2. **📊 Métricas Detalhadas**: Tempo de resposta, tentativas, status
3. **🛡️ Proteção de Dados**: Lead sempre salvo, mesmo com falha
4. **📝 Documentação Automática**: Logs completos para análise posterior
5. **🚀 Debug Eficiente**: Mensagens claras e acionáveis
6. **⚡ Performance**: Monitore tempo de cada operação
7. **🔐 Segurança**: Mascaramento parcial da API Key nos logs

---

## 🎯 Status Final

✅ Build compilado com sucesso  
✅ Logs detalhados implementados  
✅ Diagnóstico automático de erros  
✅ Sistema de retry funcional  
✅ Proteção de dados garantida  
✅ Pronto para produção!  

**Todos os logs aparecem no console do navegador (F12) durante uso do chatbot.**
