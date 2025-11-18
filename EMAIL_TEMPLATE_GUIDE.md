# Como usar o template HTML no EmailJS

## 1. Copiar o HTML do template
Abra o arquivo: `/src/lib/templates/email-template.html`

## 2. Criar o template no EmailJS

1. Acesse: https://dashboard.emailjs.com/admin/templates
2. Clique em "Create New Template"
3. Na aba "Content", cole o HTML completo do arquivo `email-template.html`
4. Configure os parâmetros:

### Parâmetros necessários:
- `{{nome}}` - Nome do lead
- `{{telefone}}` - Telefone formatado
- `{{telefone_limpo}}` - Telefone sem formatação (apenas números)
- `{{email}}` - Email do lead
- `{{interesse}}` - Descrição do interesse
- `{{historico}}` - Histórico completo da conversa
- `{{data_hora}}` - Data/hora da captura
- `{{lead_id}}` - ID único do lead

## 3. Configurar destinatário

No template do EmailJS, configure:
- **To Email**: bruno.grupooc@gmail.com
- **From Name**: Eloi - Leads
- **From Email**: Use o email verificado no seu serviço EmailJS
- **Subject**: 🔥 Novo Lead - {{nome}}

## 4. Testar o template

Use o botão "Test It" no EmailJS para enviar um email de teste com:
```json
{
  "nome": "João Silva",
  "telefone": "(15) 99651-0375",
  "telefone_limpo": "15996510375",
  "email": "joao@example.com",
  "interesse": "Implementação do chatbot",
  "historico": "Você: Olá\nEloi: Olá! Sou a Eloi...",
  "data_hora": "18/11/2025 14:30:00",
  "lead_id": "lead_1731954000000_abc123"
}
```

## 5. Copiar Template ID

Após salvar, copie o **Template ID** (ex: `template_abc123`) e adicione ao arquivo `.env`:

```env
VITE_EMAILJS_TEMPLATE_ID=template_abc123
```

## Pronto! 

O chatbot agora enviará emails bonitos e profissionais usando este template HTML com CSS inline, compatível com todos os clientes de email.
