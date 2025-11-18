import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carrega variáveis de ambiente
dotenv.config({ path: resolve(__dirname, '.env') });

console.log('\n🧪 ========== TESTE DO EMAILJS ==========\n');

const EMAILJS_SERVICE_ID = process.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.VITE_EMAILJS_PUBLIC_KEY;

console.log('🔑 Verificando variáveis de ambiente:');
console.log('  - VITE_EMAILJS_SERVICE_ID:', EMAILJS_SERVICE_ID ? `✅ ${EMAILJS_SERVICE_ID}` : '❌ NÃO CONFIGURADA');
console.log('  - VITE_EMAILJS_TEMPLATE_ID:', EMAILJS_TEMPLATE_ID ? `✅ ${EMAILJS_TEMPLATE_ID}` : '❌ NÃO CONFIGURADA');
console.log('  - VITE_EMAILJS_PUBLIC_KEY:', EMAILJS_PUBLIC_KEY ? `✅ ${EMAILJS_PUBLIC_KEY.substring(0, 8)}...` : '❌ NÃO CONFIGURADA');

if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
	console.error('\n❌ ERRO: Variáveis de ambiente não configuradas!');
	console.error('📋 Crie um arquivo .env com:');
	console.error('   VITE_EMAILJS_SERVICE_ID=seu_service_id');
	console.error('   VITE_EMAILJS_TEMPLATE_ID=seu_template_id');
	console.error('   VITE_EMAILJS_PUBLIC_KEY=sua_public_key');
	process.exit(1);
}

console.log('\n📧 Preparando email de teste...');

const templateParams = {
	nome: 'Teste via Terminal',
	telefone: '11987654321',
	telefone_limpo: '11987654321',
	email: 'teste@terminal.com',
	interesse: 'Teste de integração EmailJS via terminal',
	historico: `Usuário: Olá, quero testar o sistema
Eloi: Ótimo! Como posso ajudar?
Usuário: Quero saber se o email funciona
Eloi: Perfeito! Vou registrar seus dados.`,
	data_hora: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
	lead_id: `test_${Date.now()}`
};

console.log('\n📤 Enviando email de teste via API REST...');
console.log('  - Endpoint: https://api.emailjs.com/api/v1.0/email/send');
console.log('  - Dados:', {
	nome: templateParams.nome,
	telefone: templateParams.telefone,
	email: templateParams.email
});

try {
	const startTime = Date.now();
	
	const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			service_id: EMAILJS_SERVICE_ID,
			template_id: EMAILJS_TEMPLATE_ID,
			user_id: EMAILJS_PUBLIC_KEY,
			template_params: templateParams
		})
	});
	
	const duration = Date.now() - startTime;
	
	if (response.ok) {
		const text = await response.text();
		
		console.log('\n✅ ========== EMAIL ENVIADO COM SUCESSO! ==========');
		console.log('  - Status:', response.status);
		console.log('  - Response:', text || 'OK');
		console.log('  - Duração:', duration, 'ms');
		console.log('  - Timestamp:', new Date().toISOString());
		console.log('==================================================\n');
		
		console.log('🎉 TESTE BEM-SUCEDIDO! O EmailJS está funcionando corretamente.');
		console.log('📧 Verifique a caixa de entrada configurada no template para confirmar o recebimento.');
		console.log('📋 Email enviado para: bruno.grupooc@gmail.com (ou conforme configurado no template)');
		
		process.exit(0);
	} else {
		const errorText = await response.text();
		throw new Error(`HTTP ${response.status}: ${errorText}`);
	}
} catch (error) {
	console.error('\n❌ ========== ERRO AO ENVIAR EMAIL ==========');
	console.error('  - Tipo:', error.name);
	console.error('  - Mensagem:', error.message);
	
	if (error.message.includes('Invalid') || error.message.includes('not found') || error.message.includes('403')) {
		console.error('\n🔐 POSSÍVEL CAUSA:');
		console.error('  - Service ID, Template ID ou Public Key incorretos');
		console.error('  - Public Key pode estar desabilitada no dashboard');
		console.error('  - Verifique em: https://dashboard.emailjs.com/');
		console.error('  - Verifique se o template existe: https://dashboard.emailjs.com/admin/templates');
	} else if (error.message.includes('limit') || error.message.includes('quota') || error.message.includes('429')) {
		console.error('\n⏱️ POSSÍVEL CAUSA:');
		console.error('  - Limite mensal atingido (200 emails/mês no plano free)');
		console.error('  - Limite de taxa excedido (muitos emails em pouco tempo)');
		console.error('  - Verifique em: https://dashboard.emailjs.com/admin');
	} else if (error.message.includes('network') || error.message.includes('fetch')) {
		console.error('\n🌐 POSSÍVEL CAUSA:');
		console.error('  - Problema de conexão com a internet');
		console.error('  - Firewall ou proxy bloqueando api.emailjs.com');
	}
	
	console.error('\n🔍 PRÓXIMOS PASSOS:');
	console.error('  1. Verifique as credenciais no .env');
	console.error('  2. Acesse https://dashboard.emailjs.com/admin e confirme:');
	console.error('     - Service ID existe e está ativo');
	console.error('     - Template ID existe');
	console.error('     - Public Key está habilitada (Account > General)');
	console.error('  3. Tente novamente em alguns minutos se for limite de taxa');
	console.error('  4. Veja os logs completos acima');
	console.error('============================================\n');
	
	process.exit(1);
}
