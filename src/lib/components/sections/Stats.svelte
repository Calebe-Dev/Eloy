<script lang="ts">
	import { onMount } from 'svelte';
	import CounterAnimation from '../ui/CounterAnimation.svelte';

	let pinWrapper: HTMLElement;
	let scrollProgress = $state(0);
	let activeIndex = $state(0);
	let shouldAnimate = $state(false);

	const stats = [
		{
			value: 2,
			suffix: 'M+',
			title: 'conversas processadas',
			subtitle: 'Taxa de satisfação:',
			highlight: '94%',
			color: 'from-blue-500 to-cyan-500',
			icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
		},
		{
			value: 3,
			suffix: 'x',
			title: 'mais leads capturados',
			subtitle: 'Em comparação com atendimento manual',
			highlight: null,
			color: 'from-purple-500 to-pink-500',
			icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
		},
		{
			value: 340,
			suffix: '%',
			title: 'de melhoria em eficiência',
			subtitle: 'Redução em tempo de resposta',
			highlight: null,
			color: 'from-green-500 to-emerald-500',
			icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
		}
	];

	onMount(() => {
		const recalc = () => {
			if (!pinWrapper) return;

			const rect = pinWrapper.getBoundingClientRect();
			const start = rect.top + window.scrollY;
			const end = start + pinWrapper.offsetHeight;
			const centerDocY = window.scrollY + window.innerHeight / 2;

			const total = end - start;
			const passed = Math.min(Math.max(centerDocY - start, 0), total);
			scrollProgress = passed / total;

			if (scrollProgress < 0.33) {
				activeIndex = 0;
			} else if (scrollProgress < 0.66) {
				activeIndex = 1;
			} else {
				activeIndex = 2;
			}

			shouldAnimate = scrollProgress > 0.1;
		};

		recalc();
		window.addEventListener('scroll', recalc, { passive: true });
		window.addEventListener('resize', recalc);

		return () => {
			window.removeEventListener('scroll', recalc);
			window.removeEventListener('resize', recalc);
		};
	});
</script>

<div class="w-full relative bg-gradient-to-b from-gray-50 via-white to-gray-50">
	<div bind:this={pinWrapper} class="relative" style="height: 300vh;">
		<div class="sticky top-0 left-0 w-full h-screen overflow-hidden">
			<div class="absolute inset-0 pointer-events-none">
				<div class="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
				
				<div 
					class="absolute top-1/4 -left-32 w-80 h-80 rounded-full blur-3xl transition-all duration-1000"
					style="background: linear-gradient(to bottom right, {activeIndex === 0 ? 'rgb(59, 130, 246, 0.15), rgb(6, 182, 212, 0.15)' : activeIndex === 1 ? 'rgb(168, 85, 247, 0.15), rgb(236, 72, 153, 0.15)' : 'rgb(34, 197, 94, 0.15), rgb(16, 185, 129, 0.15)'});"
				></div>
				<div 
					class="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full blur-3xl transition-all duration-1000"
					style="background: linear-gradient(to bottom right, {activeIndex === 0 ? 'rgb(6, 182, 212, 0.15), rgb(59, 130, 246, 0.15)' : activeIndex === 1 ? 'rgb(236, 72, 153, 0.15), rgb(168, 85, 247, 0.15)' : 'rgb(16, 185, 129, 0.15), rgb(34, 197, 94, 0.15)'});"
				></div>
			</div>
			
			<div class="absolute top-0 left-0 w-full h-screen flex items-center justify-center">
				<div class="max-w-6xl mx-auto px-6 w-full">
					<div class="text-center mb-12 md:mb-16">
						<h2 class="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 tracking-tight">Números que Falam</h2>
						<p class="text-xl md:text-2xl text-gray-500 font-light">Resultados reais de quem já confia no Eloi</p>
						
						<div class="flex items-center justify-center gap-2 mt-8">
							{#each stats as _, i}
								<div class="h-1.5 rounded-full transition-all duration-500" style="width: {activeIndex === i ? '60px' : '30px'}; background: {activeIndex === i ? 'linear-gradient(to right, ' + (i === 0 ? 'rgb(59, 130, 246), rgb(6, 182, 212)' : i === 1 ? 'rgb(168, 85, 247), rgb(236, 72, 153)' : 'rgb(34, 197, 94), rgb(16, 185, 129)') + ')' : '#e5e7eb'};"></div>
							{/each}
						</div>
					</div>

					<div class="relative w-full" style="min-height: 500px;">
						{#each stats as stat, index}
							<div class="absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-out" style="opacity: {activeIndex === index ? 1 : 0}; transform: translateX({activeIndex === index ? 0 : activeIndex > index ? -100 : 100}px) scale({activeIndex === index ? 1 : 0.9}); filter: blur({activeIndex === index ? 0 : 8}px); pointer-events: {activeIndex === index ? 'auto' : 'none'};">
								<div class="w-full max-w-2xl">
									<div class="relative group">
										<div class="absolute -inset-1 bg-gradient-to-r {stat.color} rounded-[3rem] opacity-20 blur-xl"></div>
										<div class="relative bg-white rounded-[3rem] p-10 md:p-16 border border-gray-200">
											<div class="text-center space-y-8">
												<div class="relative">
													{#if shouldAnimate && activeIndex === index}
														<div class="font-bold bg-gradient-to-r {stat.color} bg-clip-text text-transparent leading-none" style="font-size: clamp(5rem, 15vw, 12rem);">
															<CounterAnimation target={stat.value} suffix={stat.suffix} delay={200} />
														</div>
													{:else}
														<div class="font-bold bg-gradient-to-r {stat.color} bg-clip-text text-transparent leading-none" style="font-size: clamp(5rem, 15vw, 12rem);">0{stat.suffix}</div>
													{/if}
													<div class="absolute -bottom-4 left-1/2 -translate-x-1/2 h-1.5 bg-gradient-to-r {stat.color} rounded-full transition-all duration-1000" style="width: {activeIndex === index ? '120px' : '0px'};"></div>
												</div>
												<div class="space-y-3">
													<h3 class="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight">{stat.title}</h3>
													<p class="text-lg md:text-xl text-gray-600 leading-relaxed">{stat.subtitle}{#if stat.highlight}<span class="font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent ml-1">{stat.highlight}</span>{/if}</p>
												</div>
												<div class="pt-4">
													<div class="w-16 h-16 mx-auto bg-gradient-to-r {stat.color} rounded-2xl flex items-center justify-center shadow-lg shadow-gray-300/50">
														<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={stat.icon}></path></svg>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>

					<div class="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6">
						<div class="flex gap-3">
							{#each stats as stat, i}
								<div class="relative transition-all duration-300" style="transform: scale({activeIndex === i ? 1.3 : 1});" role="presentation">
									<div class="w-3 h-3 rounded-full transition-all duration-300" style="background: {activeIndex === i ? 'linear-gradient(to right, ' + (i === 0 ? 'rgb(59, 130, 246), rgb(6, 182, 212)' : i === 1 ? 'rgb(168, 85, 247), rgb(236, 72, 153)' : 'rgb(34, 197, 94), rgb(16, 185, 129)') + ')' : '#d1d5db'};"></div>
								</div>
							{/each}
						</div>
						{#if scrollProgress < 0.1}
							<div class="transition-opacity duration-1000" style="opacity: {1 - scrollProgress * 10};">
								<div class="flex flex-col items-center gap-2 text-gray-400 text-sm">
									<span class="uppercase tracking-wider">Role para ver mais</span>
									<svg class="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
								</div>
							</div>
						{/if}
					</div>

					{#if scrollProgress > 0.7}
						<div class="absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000" style="opacity: {Math.min(1, (scrollProgress - 0.7) * 3)};">
							<div class="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-lg">
								<div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
								<p class="text-gray-700 font-medium text-sm md:text-base">Junte-se a mais de <span class="font-bold text-blue-600">500+ empresas</span></p>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
