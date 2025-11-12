<script lang="ts">
	import Section from '../ui/Section.svelte';
	import Container from '../ui/Container.svelte';
	import AnimatedBlock from '../ui/AnimatedBlock.svelte';
	import Button from '../ui/Button.svelte';
</script>

<Section background="transparent">
	<Container>
		<div class="space-y-16">
			<AnimatedBlock>
				<h2 class="text-4xl md:text-5xl font-bold text-center text-gray-900">Investimento</h2>
			</AnimatedBlock>

			<div class="grid md:grid-cols-3 gap-8">
				<!-- Essencial -->
				<AnimatedBlock delay={200}>
					<div class="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
						<div class="space-y-6">
							<div>
								<h3 class="text-2xl font-semibold text-gray-900">Essencial</h3>
								<div class="mt-4">
									<span class="text-5xl font-bold text-gray-900">R$ 199</span>
									<span class="text-gray-600">/mês</span>
								</div>
							</div>
							
							<ul class="space-y-3">
								<li class="flex items-start gap-3">
									<svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span class="text-gray-600">1.000 conversas/mês</span>
								</li>
								<li class="flex items-start gap-3">
									<svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span class="text-gray-600">1 canal integrado</span>
								</li>
								<li class="flex items-start gap-3">
									<svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span class="text-gray-600">Análise de desempenho</span>
								</li>
							</ul>
							
							<Button variant="ghost" size="md">Começar agora</Button>
						</div>
					</div>
				</AnimatedBlock>

				<!-- Profissional (Destaque) -->
				<AnimatedBlock delay={400}>
					<div class="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 shadow-2xl transform scale-105 relative">
						<div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
							Recomendado
						</div>
						<div class="space-y-6 text-white">
							<div>
								<h3 class="text-2xl font-semibold">Profissional</h3>
								<div class="mt-4">
									<span class="text-5xl font-bold">R$ 499</span>
									<span class="text-blue-100">/mês</span>
								</div>
							</div>
							
							<ul class="space-y-3">
								<li class="flex items-start gap-3">
									<svg class="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span>10.000 conversas/mês</span>
								</li>
								<li class="flex items-start gap-3">
									<svg class="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span>3 canais integrados</span>
								</li>
								<li class="flex items-start gap-3">
									<svg class="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span>Análise avançada com relatórios</span>
								</li>
							</ul>
							
							<Button variant="secondary" size="md">Começar agora</Button>
						</div>
					</div>
				</AnimatedBlock>

				<!-- Enterprise -->
				<AnimatedBlock delay={600}>
					<div class="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
						<div class="space-y-6">
							<div>
								<h3 class="text-2xl font-semibold text-gray-900">Enterprise</h3>
								<div class="mt-4">
									<span class="text-3xl font-bold text-gray-900">Sob cotação</span>
								</div>
							</div>
							
							<ul class="space-y-3">
								<li class="flex items-start gap-3">
									<svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span class="text-gray-600">Conversas ilimitadas</span>
								</li>
								<li class="flex items-start gap-3">
									<svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span class="text-gray-600">Integração com CRM</span>
								</li>
								<li class="flex items-start gap-3">
									<svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span class="text-gray-600">Suporte dedicado</span>
								</li>
								<li class="flex items-start gap-3">
									<svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span class="text-gray-600">Customizações avançadas</span>
								</li>
							</ul>
							
							<Button variant="ghost" size="md">Falar com vendas</Button>
						</div>
					</div>
				</AnimatedBlock>
			</div>
		</div>
	</Container>
</Section>
