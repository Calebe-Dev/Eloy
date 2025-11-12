<script lang="ts">
	const organizationSchema = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Eloi',
		alternateName: 'Eloi Chatbot',
		description: 'Chatbot inteligente para atendimento automatizado 24/7 com IA conversacional',
		url: 'https://eloi.com.br',
		logo: 'https://eloi.com.br/logo.png',
		foundingDate: '2024',
		contactPoint: {
			'@type': 'ContactPoint',
			telephone: '+55-11-9999-9999',
			contactType: 'customer service',
			availableLanguage: ['Portuguese', 'pt-BR'],
			areaServed: 'BR'
		},
		sameAs: [
			'https://facebook.com/eloi',
			'https://instagram.com/eloi',
			'https://linkedin.com/company/eloi',
			'https://twitter.com/eloi'
		],
		address: {
			'@type': 'PostalAddress',
			addressCountry: 'BR',
			addressLocality: 'Brasil'
		}
	};

	const softwareSchema = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'Eloi',
		applicationCategory: 'BusinessApplication',
		applicationSubCategory: 'Customer Service Software',
		operatingSystem: 'Web, iOS, Android',
		description: 'Chatbot inteligente com IA para atendimento automatizado 24/7. Capture mais leads, melhore eficiência e transforme seu atendimento ao cliente.',
		offers: {
			'@type': 'AggregateOffer',
			lowPrice: '199',
			highPrice: '499',
			priceCurrency: 'BRL',
			priceSpecification: {
				'@type': 'UnitPriceSpecification',
				price: '199',
				priceCurrency: 'BRL',
				billingDuration: 'P1M'
			},
			availability: 'https://schema.org/InStock'
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.7',
			ratingCount: '500',
			bestRating: '5',
			worstRating: '1'
		},
		featureList: [
			'Atendimento automatizado 24/7',
			'IA conversacional avançada',
			'Integração com WhatsApp e Instagram',
			'Dashboard de analytics',
			'Treinamento personalizado',
			'Suporte em português'
		]
	};

	const webPageSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Eloi - Chatbot Inteligente para Atendimento 24/7',
		description: 'Transforme seu atendimento ao cliente com Eloi, o chatbot inteligente que trabalha 24/7 com empatia e eficiência.',
		url: 'https://eloi.com.br',
		inLanguage: 'pt-BR',
		isPartOf: {
			'@type': 'WebSite',
			name: 'Eloi',
			url: 'https://eloi.com.br'
		}
	};

	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: 'O que é Eloi?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Eloi é um chatbot inteligente que representa a voz da sua marca com empatia e presença constante, oferecendo atendimento automatizado 24 horas por dia, 7 dias por semana.'
				}
			},
			{
				'@type': 'Question',
				name: 'Quais os benefícios de usar Eloi?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Eloi processa mais de 2 milhões de conversas, captura 3x mais leads comparado ao atendimento manual e oferece 340% de melhoria em eficiência operacional.'
				}
			},
			{
				'@type': 'Question',
				name: 'Eloi funciona em quais plataformas?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Eloi se integra com WhatsApp, Instagram, Facebook Messenger, site próprio e outras plataformas de mensageria populares.'
				}
			},
			{
				'@type': 'Question',
				name: 'Posso testar Eloi gratuitamente?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Sim! Oferecemos um período de teste gratuito para você experimentar todas as funcionalidades do Eloi antes de contratar.'
				}
			}
		]
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(organizationSchema)}<\/script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(softwareSchema)}<\/script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(webPageSchema)}<\/script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(faqSchema)}<\/script>`}
</svelte:head>
