<script lang="ts">
	import Button from '../ui/Button.svelte';
	import Container from '../ui/Container.svelte';
	import AnimatedBlock from '../ui/AnimatedBlock.svelte';

	interface Props {
		onShowChatbot?: () => void;
	}

	let { onShowChatbot }: Props = $props();

	function scrollToChatbot(smooth = false) {
		const chatbotElement = document.querySelector('[data-chatbot-section]');
		if (chatbotElement) {
			// Marca que é um scroll programático (não manual)
			sessionStorage.setItem('programmatic-scroll', 'true');
			
			chatbotElement.scrollIntoView({ 
				behavior: smooth ? 'smooth' : 'auto',
				block: 'center'
			});
			
			// Remove flag após animação completar
			setTimeout(() => {
				sessionStorage.removeItem('programmatic-scroll');
			}, smooth ? 2000 : 100);
		}
	}

	function scrollToProblem() {
		const problemElement = document.querySelector('[data-problem-section]');
		if (problemElement) {
			problemElement.scrollIntoView({ 
				behavior: 'smooth',
				block: 'start'
			});
		}
	}

	function openChatbotInHero() {
		// Chama a função para abrir o chatbot diretamente
		if (onShowChatbot) {
			onShowChatbot();
		}
	}
</script>

<div class="relative min-h-screen flex items-center justify-center overflow-hidden">
	<!-- Enhanced light gradient background with more contrast -->
	<div class="absolute inset-0 bg-gradient-to-br from-white via-gray-100 to-blue-100" aria-hidden="true"></div>
	
	<!-- Animated mesh gradient overlay with stronger colors -->
	<div 
		class="absolute inset-0 opacity-70 animate-gradient"
		style="background: linear-gradient(135deg, 
			rgba(241, 245, 249, 1) 0%,
			rgba(219, 234, 254, 0.9) 25%,
			rgba(191, 219, 254, 0.95) 50%,
			rgba(233, 213, 255, 0.9) 75%,
			rgba(241, 245, 249, 1) 100%);
			background-size: 200% 200%;"
		aria-hidden="true"
	></div>
	
	<!-- Visible grid pattern -->
	<div 
		class="absolute inset-0 opacity-[0.08]"
		style="background-image: 
			linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
			linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px);
			background-size: 40px 40px;"
		aria-hidden="true"
	></div>
	
	<!-- Enhanced floating particles - more visible -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none" style="contain: paint;">
		<!-- Large particles -->
		<div 
			class="absolute top-20 left-[10%] w-4 h-4 bg-blue-500/60 rounded-full blur-[2px] animate-particle-float shadow-lg shadow-blue-500/50"
			aria-hidden="true"
		></div>
		<div 
			class="absolute top-40 right-[15%] w-5 h-5 bg-purple-500/60 rounded-full blur-[2px] animate-particle-float-reverse shadow-lg shadow-purple-500/50"
			aria-hidden="true"
		></div>
		<div 
			class="absolute bottom-32 left-[20%] w-3 h-3 bg-pink-500/60 rounded-full blur-[1px] animate-particle-float shadow-lg shadow-pink-500/50"
			aria-hidden="true"
		></div>
		<div 
			class="absolute top-1/3 right-[25%] w-6 h-6 bg-cyan-500/50 rounded-full blur-[3px] animate-particle-float-reverse shadow-lg shadow-cyan-500/40"
			aria-hidden="true"
		></div>
		<div 
			class="absolute bottom-48 right-[30%] w-4 h-4 bg-indigo-500/60 rounded-full blur-[2px] animate-particle-float shadow-lg shadow-indigo-500/50"
			aria-hidden="true"
		></div>
		<div 
			class="absolute top-2/3 left-[30%] w-5 h-5 bg-violet-500/60 rounded-full blur-[2px] animate-particle-float-reverse shadow-lg shadow-violet-500/50"
			aria-hidden="true"
		></div>
		
		<!-- Additional medium particles -->
		<div 
			class="absolute top-1/4 left-[40%] w-3 h-3 bg-blue-400/70 rounded-full blur-[1px] animate-particle-float shadow-md shadow-blue-400/60"
			aria-hidden="true"
		></div>
		<div 
			class="absolute bottom-1/3 right-[40%] w-4 h-4 bg-purple-400/70 rounded-full blur-[2px] animate-particle-float-reverse shadow-md shadow-purple-400/60"
			aria-hidden="true"
		></div>
		<div 
			class="absolute top-1/2 left-[60%] w-3 h-3 bg-pink-400/70 rounded-full blur-[1px] animate-particle-float shadow-md shadow-pink-400/60"
			aria-hidden="true"
		></div>
		<div 
			class="absolute top-3/4 right-[50%] w-5 h-5 bg-cyan-400/60 rounded-full blur-[2px] animate-particle-float-reverse shadow-md shadow-cyan-400/50"
			aria-hidden="true"
		></div>
		
		<!-- Small accent particles -->
		<div 
			class="absolute top-[15%] right-[20%] w-2 h-2 bg-indigo-400/80 rounded-full animate-particle-float shadow-sm shadow-indigo-400/70"
			aria-hidden="true"
		></div>
		<div 
			class="absolute bottom-[25%] left-[45%] w-2 h-2 bg-violet-400/80 rounded-full animate-particle-float-reverse shadow-sm shadow-violet-400/70"
			aria-hidden="true"
		></div>
		<div 
			class="absolute top-[60%] right-[35%] w-2 h-2 bg-blue-300/80 rounded-full animate-particle-float shadow-sm shadow-blue-300/70"
			aria-hidden="true"
		></div>
		<div 
			class="absolute bottom-[40%] left-[25%] w-2 h-2 bg-purple-300/80 rounded-full animate-particle-float-reverse shadow-sm shadow-purple-300/70"
			aria-hidden="true"
		></div>
		<div 
			class="absolute top-[35%] left-[55%] w-2 h-2 bg-pink-300/80 rounded-full animate-particle-float shadow-sm shadow-pink-300/70"
			aria-hidden="true"
		></div>
	</div>
	
	<!-- Animated gradient orbs - more visible and saturated -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none" style="contain: paint;">
		<!-- Top-left orb - Blue gradient with more saturation -->
		<div 
			class="absolute -top-32 -left-40 bg-gradient-to-br from-blue-300/70 via-cyan-200/50 to-transparent rounded-full blur-3xl animate-float"
			style="width: 35rem; height: 35rem;"
			aria-hidden="true"
		></div>
		
		<!-- Bottom-right orb - Purple/Pink gradient with more saturation -->
		<div 
			class="absolute -bottom-32 -right-40 bg-gradient-to-tl from-purple-300/70 via-pink-200/50 to-transparent rounded-full blur-3xl animate-float-delayed"
			style="width: 40rem; height: 40rem;"
			aria-hidden="true"
		></div>
		
		<!-- Center orb - Violet glow with more visibility -->
		<div 
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-indigo-200/50 via-violet-100/35 to-transparent rounded-full blur-3xl animate-pulse-slow"
			style="width: min(900px, 95vw); height: min(900px, 95vw);"
			aria-hidden="true"
		></div>
		
		<!-- Additional accent orbs for more depth -->
		<div 
			class="absolute top-1/4 right-1/4 bg-gradient-to-br from-blue-200/40 via-purple-100/30 to-transparent rounded-full blur-2xl animate-float"
			style="width: 25rem; height: 25rem;"
			aria-hidden="true"
		></div>
		<div 
			class="absolute bottom-1/3 left-1/3 bg-gradient-to-tl from-pink-200/40 via-violet-100/30 to-transparent rounded-full blur-2xl animate-float-delayed"
			style="width: 28rem; height: 28rem;"
			aria-hidden="true"
		></div>
	</div>

	<Container size="lg" class="relative z-10 px-4 sm:px-6 lg:px-8">
		<div class="text-center max-w-4xl mx-auto py-12 sm:py-16 lg:py-0">
			<!-- Text content centered -->
			<div class="space-y-6 sm:space-y-7 lg:space-y-8">
				<AnimatedBlock>
					<h1 class="font-bold tracking-tight leading-[1.1] sm:leading-tight">
						<span 
							class="block text-gray-900" 
							style="font-size: clamp(2.5rem, 8vw, 4.5rem); 
								font-display: swap;
								text-shadow: 0 2px 20px rgba(255, 255, 255, 0.8), 0 1px 3px rgba(0, 0, 0, 0.1);"
						>
							O que falta para
						</span>
						<span
							class="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mt-2 sm:mt-3"
							style="font-size: clamp(2.5rem, 8vw, 4.5rem); 
								font-display: swap;
								filter: drop-shadow(0 2px 10px rgba(147, 51, 234, 0.3));"
						>
							um bom atendimento?
						</span>
					</h1>
				</AnimatedBlock>

				<AnimatedBlock delay={200}>
					<p 
						class="font-light text-gray-700 leading-relaxed" 
						style="font-size: clamp(1.125rem, 3vw, 1.5rem);
							text-shadow: 0 1px 10px rgba(255, 255, 255, 0.9), 0 1px 2px rgba(0, 0, 0, 0.05);"
					>
						Não é sobre mais pessoas.<br class="hidden sm:block" />
						<span class="sm:inline block mt-1 sm:mt-0">É sobre <span class="font-semibold text-blue-700">mais presença</span>.</span>
					</p>
				</AnimatedBlock>

				<AnimatedBlock delay={400}>
					<p 
						class="text-gray-600 leading-relaxed max-w-2xl mx-auto px-4 sm:px-0" 
						style="font-size: clamp(1rem, 2vw, 1.125rem);
							text-shadow: 0 1px 8px rgba(255, 255, 255, 0.8);"
					>
						Eloi nasceu para representar a voz da sua marca com empatia, constância e propósito.
						Sempre pronto. Sempre coerente. Sempre humano.
					</p>
				</AnimatedBlock>

				<AnimatedBlock delay={600}>
					<div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center pt-2 sm:pt-4 max-w-md sm:max-w-none mx-auto px-4 sm:px-0">
						<Button 
							variant="primary" 
							size="lg" 
							class="w-full sm:w-auto min-h-[48px] sm:min-h-[56px] text-base sm:text-lg"
							onclick={openChatbotInHero}
						>
							Conheça Eloi
						</Button>
						<Button 
							variant="secondary" 
							size="lg" 
							class="w-full sm:w-auto min-h-[48px] sm:min-h-[56px] text-base sm:text-lg"
							onclick={scrollToProblem}
						>
							Ver demonstração
						</Button>
					</div>
				</AnimatedBlock>
			</div>
		</div>
	</Container>

	<!-- Modern scroll indicator with subtle colors -->
	<div class="absolute bottom-12 left-1/2 -translate-x-1/2 hidden lg:block" aria-hidden="true">
		<div class="flex flex-col items-center gap-3">
			<span class="text-gray-500 text-sm font-medium uppercase tracking-widest" style="text-shadow: 0 1px 3px rgba(255, 255, 255, 0.8);">Explore</span>
			<div class="relative">
				<!-- Subtle glow effect -->
				<div class="absolute inset-0 animate-glow-pulse rounded-full opacity-60"></div>
				<!-- Mouse/scroll icon -->
				<div class="relative w-8 h-12 border-2 border-gray-400 rounded-full p-1.5 bg-white/80 backdrop-blur-sm shadow-lg">
					<div class="w-1.5 h-3 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full animate-scroll-bounce mx-auto"></div>
				</div>
			</div>
			<svg class="w-5 h-5 text-gray-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7"></path>
			</svg>
		</div>
	</div>
</div>

<!-- Modern Scroll CTA Banner with enhanced gradient -->
<div class="relative bg-gradient-to-r from-gray-50 via-blue-100 to-purple-100 overflow-hidden border-y border-gray-300/60">
	<!-- Animated gradient overlay with more saturation -->
	<div 
		class="absolute inset-0 opacity-60 animate-gradient"
		style="background: linear-gradient(90deg, 
			rgba(191, 219, 254, 0.7) 0%,
			rgba(221, 214, 254, 0.7) 50%,
			rgba(251, 207, 232, 0.7) 100%);
			background-size: 200% 100%;"
		aria-hidden="true"
	></div>
	
	<!-- Visible grid pattern -->
	<div class="absolute inset-0 opacity-[0.05]">
		<div class="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]"></div>
	</div>
	
	<!-- Floating particles effect -->
	<div class="absolute top-1/2 left-1/4 w-48 h-48 bg-blue-300/40 rounded-full blur-3xl animate-float"></div>
	<div class="absolute bottom-1/4 right-1/3 w-56 h-56 bg-purple-300/40 rounded-full blur-3xl animate-float-delayed"></div>
	
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
		<div class="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
			<!-- Left side - Main message with badge -->
			<div class="text-center lg:text-left flex-1 space-y-4">
				<!-- Status badge -->
				<div class="inline-flex items-center gap-2.5 px-5 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
					<span class="relative flex h-2.5 w-2.5">
						<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
						<span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
					</span>
					<span class="text-gray-700 text-sm font-semibold uppercase tracking-wider">Disponível agora</span>
				</div>
				
				<!-- Main heading -->
				<h2 
					class="text-gray-900 font-bold leading-tight" 
					style="font-size: clamp(1.75rem, 4vw, 2.5rem);
						text-shadow: 0 2px 15px rgba(255, 255, 255, 0.9), 0 1px 3px rgba(0, 0, 0, 0.08);"
				>
					Descubra como <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Eloi transforma</span> atendimento
				</h2>
				
				<!-- Description -->
				<p 
					class="text-gray-600 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0" 
					style="font-size: clamp(1rem, 2vw, 1.125rem);
						text-shadow: 0 1px 8px rgba(255, 255, 255, 0.8);"
				>
					Role a página para conhecer os recursos, ver resultados reais e testar gratuitamente
				</p>
			</div>
			
			<!-- Right side - Interactive elements -->
			<div class="flex flex-col sm:flex-row items-center gap-6 lg:gap-8">
				<!-- Animated scroll indicator (desktop only) -->
				<div class="hidden lg:flex flex-col items-center gap-3">
					<div class="relative">
						<!-- Pulsing ring -->
						<div class="absolute inset-0 animate-ping">
							<div class="w-16 h-16 border-2 border-blue-300/50 rounded-full"></div>
						</div>
						<!-- Icon container -->
						<div class="relative w-16 h-16 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-lg">
							<svg class="w-7 h-7 text-gray-600 animate-scroll-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 14l-7 7m0 0l-7-7"></path>
							</svg>
						</div>
					</div>
					<span class="text-gray-500 text-xs font-semibold uppercase tracking-widest">Explore</span>
				</div>
				
				<!-- CTA button with enhanced glow -->
				<div class="relative group">
					<!-- Glow effect -->
					<div class="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-all duration-500 animate-gradient" style="background-size: 200% 200%;"></div>
					
				<!-- Button -->
				<button 
					onclick={scrollToProblem}
					class="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-7 sm:px-10 py-4 sm:py-5 rounded-xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 text-base sm:text-lg whitespace-nowrap"
				>
					<span>Testar agora</span>
						<svg class="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
						</svg>
					</button>
				</div>
			</div>
		</div>
		
		<!-- Mobile scroll hint with modern design -->
		<div class="lg:hidden flex items-center justify-center gap-3 mt-8 pt-6 border-t border-gray-200">
			<div class="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-sm">
				<svg class="w-5 h-5 text-gray-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 14l-7 7m0 0l-7-7"></path>
				</svg>
			</div>
			<span class="text-gray-700 text-sm font-semibold">Deslize para explorar</span>
		</div>
	</div>
</div>
