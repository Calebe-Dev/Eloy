export const siteConfig = {
	name: 'Eloi',
	title: 'Eloi - Chatbot Inteligente para Atendimento 24/7 | Transforme seu Atendimento',
	description: 'Eloi é o chatbot inteligente que representa a voz da sua marca com empatia e presença constante. Atendimento automatizado 24/7, mais leads capturados e 340% de melhoria em eficiência.',
	url: 'https://eloi.com.br',
	ogImage: 'https://eloi.com.br/og-image.jpg',
	keywords: 'chatbot, atendimento automatizado, chat inteligente, IA conversacional, bot whatsapp, atendimento 24/7, automação atendimento, chatbot empresarial, chatbot para sites',
	links: {
		linkedin: 'https://linkedin.com/company/eloi',
		twitter: 'https://twitter.com/eloi'
	},
	contact: {
		phone: '+55-11-9999-9999',
		email: 'contato@eloi.com.br'
	},
	stats: {
		conversations: '2M+',
		leadsMultiplier: '3x',
		efficiencyGain: '340%',
		companies: '500+',
		rating: '4.7',
		reviews: '500'
	}
} as const;

export type SiteConfig = typeof siteConfig;
