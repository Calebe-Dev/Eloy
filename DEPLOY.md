# 🔧 Configuração para Deploy (Netlify/Vercel)

## ⚠️ Importante: Build Estática

Este projeto usa **adapter-static** do SvelteKit, gerando uma build totalmente estática. Isso significa que:

- ✅ Funciona em qualquer servidor de arquivos estáticos
- ✅ Netlify e Vercel com suporte a Functions/Edge
- ❌ Não tem backend Node.js rodando
- ❌ `hooks.server.ts` não funciona (foi removido)

## 🔐 Variáveis de Ambiente Necessárias

Configure no painel do Netlify/Vercel:

```bash
# OpenAI API (para função serverless)
OPENAI_API_KEY=sk-proj-...
OPENAI_MODEL=gpt-4o-mini

# EmailJS (para frontend)
VITE_EMAILJS_SERVICE_ID=service_...
VITE_EMAILJS_TEMPLATE_ID=template_...
VITE_EMAILJS_PUBLIC_KEY=...
```

## 📦 Deploy no Netlify

### 1. Configuração Automática
O arquivo `netlify.toml` já está configurado:

```toml
[build]
  command = "npm run build"
  publish = "build"
  functions = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

### 2. Variáveis de Ambiente
No painel do Netlify:
1. Vá em **Site settings → Environment variables**
2. Adicione as variáveis acima
3. Faça redeploy

### 3. Headers de Segurança
Os headers CSP estão configurados em `static/_headers` e serão copiados automaticamente para `build/_headers`.

## 🚀 Deploy no Vercel

### 1. Criar `vercel.json`

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "functions": {
    "netlify/functions/*.ts": {
      "runtime": "nodejs20.x"
    }
  },
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/netlify/functions/:path*"
    }
  ]
}
```

### 2. Variáveis de Ambiente
No painel do Vercel:
1. Vá em **Settings → Environment Variables**
2. Adicione as variáveis acima
3. Faça redeploy

## 🤖 Como Funciona o Chatbot

### Fluxo Atual (Após Correção):

```
Frontend (ChatbotEloi.svelte)
    ↓
    fetch('/.netlify/functions/chat')
    ↓
Serverless Function (netlify/functions/chat.ts)
    ↓
    fetch('https://api.openai.com')
    ↓
OpenAI API (com API Key segura no backend)
    ↓
Resposta retorna para o frontend
```

### ⚠️ Por que não funciona chamar OpenAI direto do frontend?

1. **CORS**: OpenAI não permite chamadas diretas de browsers
2. **Segurança**: Expõe sua API key no código do cliente
3. **Impossível em build estática**: Sem backend Node.js

## 🐛 Erros Resolvidos

### ❌ Erro Original: `Failed to fetch`
**Causa**: Tentava chamar `https://api.openai.com` diretamente do navegador

**Solução**: Criada função serverless `netlify/functions/chat.ts` que faz a chamada com segurança

### ❌ Erro CSP: Clarity bloqueado
**Causa**: Faltava `https://l.clarity.ms` no `connect-src`

**Solução**: Adicionado em `src/app.html` e `static/_headers`

## ✅ Checklist de Deploy

- [ ] Variáveis de ambiente configuradas no Netlify/Vercel
- [ ] Build local testada: `npm run build`
- [ ] Preview local funcionando: `npm run preview`
- [ ] Função serverless testada localmente (opcional): `netlify dev`
- [ ] Headers CSP atualizados em `static/_headers`
- [ ] Arquivo `netlify.toml` ou `vercel.json` configurado

## 🧪 Testar Localmente

### Com Netlify Dev:
```bash
npm install -g netlify-cli
netlify dev
```

Isso simula o ambiente Netlify localmente, incluindo as funções serverless.

### Preview da Build:
```bash
npm run build
npm run preview
```

⚠️ **Atenção**: `npm run preview` não executa as funções serverless. O chatbot vai falhar. Use `netlify dev` para testar tudo.

## 📚 Arquivos Importantes

- `svelte.config.js` - Configuração do adapter-static
- `netlify.toml` - Configuração do Netlify
- `static/_headers` - Headers de segurança (CSP)
- `netlify/functions/chat.ts` - Função serverless para OpenAI
- `src/app.html` - Meta tags CSP inline

## 🔄 Rebuild Necessário?

Sempre que alterar:
- Variáveis de ambiente → Sim
- Headers CSP → Sim
- Funções serverless → Sim
- Código frontend → Sim

## 📞 Suporte

Se algo não funcionar:
1. Verifique as variáveis de ambiente
2. Verifique os logs no Netlify/Vercel
3. Teste localmente com `netlify dev`
4. Verifique o console do navegador (F12)

## 🔐 Backend PHP (Hostinger) — Proxy para OpenAI

Se você vai hospedar o frontend estático no Hostinger e precisa manter a chave OpenAI segura, crie um endpoint PHP que funcione como proxy (ex.: `https://digital.grupooc.com.br/api/chat.php`). Este repositório já traz um exemplo em `api/chat.php`.

Passos rápidos:

1. Faça upload do arquivo `api/chat.php` para a pasta `public_html/api/` do Hostinger (ou caminho equivalente).
2. Defina a variável de ambiente `OPENAI_API_KEY` no painel do Hostinger (se disponível). Se não houver suporte, crie um arquivo `api/.env.local` com conteúdo:

```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx
OPENAI_MODEL=gpt-3.5-turbo
```

3. Ajuste CORS no topo de `api/chat.php` trocando `Access-Control-Allow-Origin: *` pelo seu domínio de produção para maior segurança.
4. No frontend, defina `VITE_CHAT_API_URL` (opcional) apontando para a URL completa do PHP, ou deixe em branco para usar `/api/chat.php`.

Exemplo (frontend usando variável):

```env
VITE_CHAT_API_URL=https://digital.grupooc.com.br/api/chat.php
```

Observações de segurança:

- Nunca comite `api/.env.local` com a chave ao repositório.
- Prefira variáveis de ambiente no painel do Hostinger.
- Monitore uso da chave na OpenAI e aplique limites/quotas.
