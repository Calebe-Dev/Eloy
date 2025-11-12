<script lang="ts">
	let {
		title = 'Eloi - Chatbot Inteligente para Atendimento 24/7 | Transforme seu Atendimento',
		description = 'Eloi é o chatbot inteligente que representa a voz da sua marca com empatia e presença constante. Atendimento automatizado 24/7, mais leads capturados e 340% de melhoria em eficiência. Teste grátis agora!',
		canonical = 'https://eloi.com.br',
		image = 'https://eloi.com.br/og-image.jpg',
		type = 'website',
		keywords = 'chatbot, atendimento automatizado, chat inteligente, IA conversacional, bot whatsapp, atendimento 24/7, automação atendimento, chatbot empresarial, bot instagram'
	} = $props();
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<link rel="canonical" href={canonical} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content="pt_BR" />
	<meta property="og:site_name" content="Eloi" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={canonical} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={image} />

	<!-- Additional SEO -->
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
	<meta name="language" content="Portuguese" />
	<meta name="author" content="Eloi" />
	<meta name="publisher" content="Eloi" />
	<meta name="format-detection" content="telephone=no" />
	
	<!-- Geo Tags -->
	<meta name="geo.region" content="BR" />
	<meta name="geo.placename" content="Brasil" />
</svelte:head>
