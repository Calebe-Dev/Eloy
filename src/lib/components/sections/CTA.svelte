<script lang="ts">
	import Section from '../ui/Section.svelte';
	import Container from '../ui/Container.svelte';
	import AnimatedBlock from '../ui/AnimatedBlock.svelte';
	import Button from '../ui/Button.svelte';

	const whatsappNumber = '5515996510375';

	function abrirWhatsAppDemo() {
		const mensagem = 'Olá! Gostaria de falar com o Eloi e conhecer a solução.';
		const encodedMessage = encodeURIComponent(mensagem);
		window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
	}

	function abrirWhatsAppAgendar() {
		const mensagem = 'Olá! Gostaria de agendar uma conversa com um especialista sobre o Eloi.';
		const encodedMessage = encodeURIComponent(mensagem);
		window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
	}
</script>

<Section background="gradient">
	<Container>
		<div class="text-center max-w-4xl mx-auto space-y-10">
			<AnimatedBlock>
				<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
					Eleve seu atendimento ao próximo nível
				</h2>
			</AnimatedBlock>

			<AnimatedBlock delay={200}>
				<p class="text-xl md:text-2xl text-gray-600 leading-relaxed">
					Escolha o plano ideal e revolucione o atendimento da sua empresa com Eloi.
				</p>
			</AnimatedBlock>

			<AnimatedBlock delay={400}>
				<div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
					<Button variant="primary" size="lg" onclick={abrirWhatsAppDemo}>Fale com Eloi</Button>
					<Button variant="ghost" size="lg" onclick={abrirWhatsAppAgendar}>Agendar Conversa com Especialista</Button>
				</div>
			</AnimatedBlock>

			<AnimatedBlock delay={600}>
				<p class="text-sm text-gray-500 pt-4">
					✨ Configuração completa incluída • Entrega em até 15 dias úteis • Sem dependência de terceiros
				</p>
			</AnimatedBlock>
		</div>
	</Container>
</Section>
