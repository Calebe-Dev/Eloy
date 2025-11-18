# 🛠️ Comandos úteis do Console - Eloi

Quando você abrir o site e interagir com o chatbot, poderá usar estes comandos no console do navegador (F12 → Console):

## 📥 Exportar dados salvos

### Exportar todos os leads capturados
```javascript
exportLeads()
```
**O que faz**: Baixa arquivo JSON com todos os leads salvos no localStorage

### Exportar histórico de interações
```javascript
exportInteractions()
```
**O que faz**: Baixa arquivo JSON com todas as interações do chatbot

### Ver estatísticas
```javascript
viewStats()
```
**O que faz**: Mostra resumo no console:
```
📊 ESTATÍSTICAS ELOI:
  - Total de leads: 5
  - Total de interações: 23
  - Leads com email enviado: 4
  - Leads sem email: 1
```

## 🔍 Inspecionar dados manualmente

### Ver todos os leads
```javascript
JSON.parse(localStorage.getItem('eloi_leads'))
```

### Ver todas as interações
```javascript
JSON.parse(localStorage.getItem('eloi_interactions'))
```

### Ver lead específico
```javascript
localStorage.getItem('eloi_lead_LEAD_ID_AQUI')
```

## 🧹 Limpar dados (use com cuidado!)

### Limpar apenas leads
```javascript
localStorage.removeItem('eloi_leads')
```

### Limpar apenas interações
```javascript
localStorage.removeItem('eloi_interactions')
```

### Limpar TUDO do Eloi
```javascript
Object.keys(localStorage)
  .filter(key => key.startsWith('eloi_'))
  .forEach(key => localStorage.removeItem(key))
```

## 🧪 Testar envio de email manualmente

Você pode chamar a função de envio diretamente (se tiver acesso ao componente):

```javascript
// Isso só funciona se você tiver referência ao componente
// Normalmente usado apenas para debugging
```

## 📊 Verificar configurações EmailJS

```javascript
console.log({
  service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  public_key: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ? '✅ Configurada' : '❌ Não configurada'
})
```

## 🎯 Exemplos práticos

### Recuperar leads após falha de envio
1. Abra console (F12)
2. Digite: `exportLeads()`
3. Arquivo será baixado automaticamente
4. Envie manualmente para bruno.grupooc@gmail.com

### Ver último lead capturado
```javascript
const leads = JSON.parse(localStorage.getItem('eloi_leads') || '[]')
console.log(leads[leads.length - 1])
```

### Contar leads por status
```javascript
const leads = JSON.parse(localStorage.getItem('eloi_leads') || '[]')
console.log({
  'Email enviado': leads.filter(l => l.email_sent).length,
  'Email pendente': leads.filter(l => !l.email_sent).length,
  'Total': leads.length
})
```

## 🚨 Em caso de problemas

Se emails não estiverem sendo enviados:

1. Verifique configurações:
```javascript
viewStats()
```

2. Exporte leads pendentes:
```javascript
exportLeads()
```

3. Verifique logs no console (F12)
4. Procure por mensagens começando com:
   - `🔍 ==========` (início do processo)
   - `❌` (erros)
   - `✅` (sucesso)

## 💡 Dicas

- Todos esses comandos estão disponíveis globalmente
- Dados nunca são perdidos (localStorage + redundância)
- Você pode exportar dados a qualquer momento
- Em produção, use HTTPS para segurança
