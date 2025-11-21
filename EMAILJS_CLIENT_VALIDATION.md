EmailJS Client-Side Validation
================================

O objetivo deste documento é registrar as modificações e fornecer instruções para validar o caminho cliente do EmailJS (browser SDK) no projeto.

Modificações adicionadas
- Adicionado um teste Playwright: `tests/emailjs-client.spec.ts`.
  - O teste serve estático o diretório `build/` (porta `3003`).
  - Intercepta requisições para `https://api.emailjs.com/**` e as responde com 200 (mock), permitindo validar que o cliente dispara a chamada.
  - Simula envio de mensagem no chatbot e verifica que a requisição ao EmailJS foi feita e contém `service_id`, `template_id` e `user_id`.

Por que este teste
- O SDK `@emailjs/browser` é desenhado para rodar no contexto do browser. O teste garante que, quando o chatbot captura nome + telefone + email, ele dispara o envio via EmailJS no cliente.
- Testar a chamada real para EmailJS em ambiente CI ou servidor pode retornar 403 (EmailJS pode bloquear requisições não-browser). O teste intercepta e valida o fluxo sem depender da conta EmailJS.

Como rodar localmente
1. Gere o build do frontend (se ainda não feito):

```bash
npm run build
```

2. Rode os testes Playwright (o teste criará um servidor local para `build/` automaticamente):

```bash
npm test -- tests/emailjs-client.spec.ts
```

O teste irá:
- subir um servidor estático em `http://localhost:3003/` servindo `build/`;
- abrir a página no Playwright, abrir o chatbot, enviar uma mensagem que contém nome/telefone/email;
- interceptar a requisição para `https://api.emailjs.com` e validar que houve uma chamada e que o corpo contém `service_id/template_id/user_id`.

Interpretação dos resultados
- Sucesso: o teste passa → o cliente está chamando corretamente o endpoint do EmailJS quando o lead é capturado.
- Falha (requests.length === 0): o cliente não disparou a chamada — pode ser que o fluxo do chatbot não tenha capturado os dados (ver logs no console do browser ou abram manualmente o site para reproduzir).

Notas e limitações
- O teste mocka a resposta do EmailJS; ele não verifica entrega de email real.
- Em ambiente real, EmailJS pode recusar chamadas server-side ou de headless browsers; por isso o teste usa intercept/mocking para validar o fluxo de front-end.
- Se preferir testar envio real no navegador, abra o site (`build/`) localmente com um servidor estático (ex: `npx serve build` ou `python3 -m http.server 3000 --directory build`) e acione o chatbot manualmente no navegador. Use DevTools → Network para observar `https://api.emailjs.com`.

Próximos passos recomendados
- Se quiser garantir envio real em produção, confirme no dashboard do EmailJS se a conta permite envios do domínio do site e revise quotas.
- Para confiabilidade de fallback no servidor, considere migrar `api/send-email.php` para PHPMailer+SMTP com credenciais autenticadas.

Documentado por: alterações automáticas via ferramenta de testes.
