# Integração EmailJS - Eloi

## Passos para configurar:

### 1. Criar conta no EmailJS
- Acesse: https://www.emailjs.com/
- Crie uma conta gratuita
- Confirme o email

### 2. Configurar Email Service
- No dashboard, vá em "Email Services"
- Clique em "Add New Service"
- Escolha seu provedor de email (Gmail, Outlook, etc.)
- Conecte sua conta
- Anote o **Service ID**

### 3. Criar Template de Email
- Vá em "Email Templates"
- Clique em "Create New Template"
- Use o conteúdo do arquivo `/src/lib/templates/email-template.html`
- Configure os parâmetros do template:
  - `{{nome}}`
  - `{{telefone}}`
  - `{{telefone_limpo}}`
  - `{{email}}`
  - `{{interesse}}`
  - `{{historico}}`
  - `{{data_hora}}`
  - `{{lead_id}}`
- Anote o **Template ID**

### 4. Obter Public Key
- Vá em "Account" → "General"
- Copie a **Public Key**

### 5. Configurar variáveis de ambiente
Crie/edite o arquivo `.env` na raiz do projeto:

```env
VITE_EMAILJS_SERVICE_ID=seu_service_id_aqui
VITE_EMAILJS_TEMPLATE_ID=seu_template_id_aqui
VITE_EMAILJS_PUBLIC_KEY=sua_public_key_aqui
```

### 6. Reiniciar o servidor
```bash
npm run dev
```

## Testando

1. Abra o chatbot Eloi
2. Complete uma interação até capturar o lead
3. Verifique o console para logs detalhados
4. Confira o email em bruno.grupooc@gmail.com

## Limites do Plano Gratuito
- 200 emails/mês
- Sem custo
- Perfeito para sites estáticos
