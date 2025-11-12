<script lang="ts">
	import Section from '../ui/Section.svelte';
	import Container from '../ui/Container.svelte';
	import ScrollReveal from '../ui/ScrollReveal.svelte';
	import Button from '../ui/Button.svelte';
</script>

<Section background="transparent" spacing="large">
	<Container>
		<div class="space-y-16 md:space-y-20">
			<ScrollReveal animation="fade-up">
				<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900">Investimento</h2>
				<p class="text-lg md:text-xl text-gray-600 text-center mt-4 max-w-2xl mx-auto">
					Escolha o plano ideal para transformar seu atendimento
				</p>
			</ScrollReveal>

			<div class="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
				<!-- Essencial -->
				<ScrollReveal animation="fade-up" delay={100}>
					<div class="relative bg-white rounded-3xl p-8 lg:p-10 shadow-md border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full flex flex-col">
						<div class="space-y-6 flex-1">
							<div>
								<h3 class="text-2xl lg:text-3xl font-semibold text-gray-900">Essencial</h3>
								<div class="mt-6">
									<span class="text-5xl lg:text-6xl font-bold text-gray-900">R$ 199</span>
									<span class="text-gray-600 text-lg">/mês</span>
								</div>
							</div>
							
							<ul class="space-y-4">
								<li class="flex items-start gap-3">
									<svg class="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span class="text-gray-600 text-lg">1.000 conversas/mês</span>
								</li>
								<li class="flex items-start gap-3">
									<svg class="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span class="text-gray-600 text-lg">1 canal integrado</span>
								</li>
								<li class="flex items-start gap-3">
									<svg class="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span class="text-gray-600 text-lg">Análise de desempenho</span>
								</li>
							</ul>
						</div>
						
						<div class="mt-8">
							<Button variant="ghost" size="md">Começar agora</Button>
						</div>
					</div>
				</ScrollReveal>

				<!-- Profissional (Destaque) -->
				<ScrollReveal animation="scale" delay={200}>
					<div class="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-8 lg:p-10 shadow-2xl transform scale-105 h-full flex flex-col">
						<div class="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
							✨ Recomendado
						</div>
						<div class="space-y-6 text-white flex-1">
							<div>
								<h3 class="text-2xl lg:text-3xl font-semibold">Profissional</h3>
								<div class="mt-6">
									<span class="text-5xl lg:text-6xl font-bold">R$ 499</span>
									<span class="text-blue-100 text-lg">/mês</span>
								</div>
							</div>
							
							<ul class="space-y-4">
								<li class="flex items-start gap-3">
									<svg class="w-6 h-6 text-yellow-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span class="text-lg">10.000 conversas/mês</span>
								</li>
								<li class="flex items-start gap-3">
									<svg class="w-6 h-6 text-yellow-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span class="text-lg">3 canais integrados</span>
								</li>
								<li class="flex items-start gap-3">
									<svg class="w-6 h-6 text-yellow-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span class="text-lg">Análise avançada com relatórios</span>
								</li>
							</ul>
						</div>
						
						<div class="mt-8">
							<Button variant="secondary" size="md">Começar agora</Button>
						</div>
					</div>
				</ScrollReveal>

				<!-- Enterprise -->
				<ScrollReveal animation="fade-up" delay={300}>
					<div class="relative bg-white rounded-3xl p-8 lg:p-10 shadow-md border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full flex flex-col">
						<div class="space-y-6 flex-1">
							<div>
								<h3 class="text-2xl lg:text-3xl font-semibold text-gray-900">Enterprise</h3>
								<div class="mt-6">
									<span class="text-3xl lg:text-4xl font-bold text-gray-900">Sob cotação</span>
								</div>
							</div>
							
							<ul class="space-y-4">
								<li class="flex items-start gap-3">
									<svg class="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span class="text-gray-600 text-lg">Conversas ilimitadas</span>
								</li>
								<li class="flex items-start gap-3">
									<svg class="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span class="text-gray-600 text-lg">Integração com CRM</span>
								</li>
								<li class="flex items-start gap-3">
									<svg class="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span class="text-gray-600 text-lg">Suporte dedicado</span>
								</li>
								<li class="flex items-start gap-3">
									<svg class="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span class="text-gray-600 text-lg">Customizações avançadas</span>
								</li>
							</ul>
						</div>
						
						<div class="mt-8">
							<Button variant="ghost" size="md">Falar com vendas</Button>
						</div>
					</div>
				</ScrollReveal>
			</div>
		</div>
	</Container>
</Section>
