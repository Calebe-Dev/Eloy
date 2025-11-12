# ScrollProgressBar

Componente reutilizável de barra de progresso que aparece automaticamente apenas quando a animação está visível na tela.

## Características

- ✅ **Detecção automática de visibilidade** usando IntersectionObserver
- ✅ **Independente para cada seção** - cada animação tem sua própria barra
- ✅ **Configurável** - posição, threshold, número de passos
- ✅ **Animação suave** - fade in/out quando entra/sai da viewport
- ✅ **Design Apple-style** - visual moderno com backdrop blur

## Como Usar

### 1. Importe o componente

```svelte
<script lang="ts">
  import ScrollProgressBar from '$lib/components/ui/ScrollProgressBar.svelte';
  
  let sectionElement = $state<HTMLElement>();
  let currentStep = $state(0);
  const totalSteps = 5; // número de etapas da sua animação
</script>
```

### 2. Adicione o elemento de referência

```svelte
<div bind:this={sectionElement}>
  <!-- Seu conteúdo animado aqui -->
</div>
```

### 3. Configure a lógica de progressão

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  
  onMount(() => {
    // Exemplo: incrementar step baseado em scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Sua lógica de progressão
            setTimeout(() => { currentStep = 1; }, 200);
            setTimeout(() => { currentStep = 2; }, 600);
            // ...
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (sectionElement) {
      observer.observe(sectionElement);
    }
    
    return () => observer.disconnect();
  });
</script>
```

### 4. Adicione o componente ScrollProgressBar

```svelte
<ScrollProgressBar 
  bind:targetElement={sectionElement}
  {totalSteps}
  {currentStep}
  position="bottom-center"
/>
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `targetElement` | `HTMLElement` | - | **Requerido**. Elemento a ser observado para detectar visibilidade |
| `totalSteps` | `number` | - | **Requerido**. Número total de passos/itens na animação |
| `currentStep` | `number` | - | **Requerido**. Passo atual (0 a totalSteps) |
| `position` | `'bottom-center' \| 'top-center' \| 'bottom-left' \| 'bottom-right'` | `'bottom-center'` | Posição da barra na tela |
| `visibilityThreshold` | `number` | `0.3` | Threshold do IntersectionObserver (0-1) |

## Exemplo Completo

Veja `src/lib/components/sections/HowItWorks.svelte` para um exemplo completo de implementação.

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import ScrollProgressBar from '$lib/components/ui/ScrollProgressBar.svelte';
  
  let sectionElement = $state<HTMLElement>();
  let currentStep = $state(0);
  const totalSteps = 3;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => { currentStep = 1; }, 200);
            setTimeout(() => { currentStep = 2; }, 600);
            setTimeout(() => { currentStep = 3; }, 1000);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (sectionElement) {
      observer.observe(sectionElement);
    }
    
    return () => observer.disconnect();
  });
</script>

<div bind:this={sectionElement}>
  <!-- Sua animação aqui -->
  <h2>Passo 1</h2>
  <h2>Passo 2</h2>
  <h2>Passo 3</h2>
</div>

<ScrollProgressBar 
  bind:targetElement={sectionElement}
  {totalSteps}
  {currentStep}
  position="bottom-center"
/>
```

## Casos de Uso

### ChatMockup (Scroll-driven)
O componente ChatMockup já tem uma barra de progresso integrada que mostra o progresso das mensagens aparecendo conforme o scroll.

### HowItWorks (Time-based)
A seção HowItWorks usa a barra de progresso para mostrar os 3 passos sendo revelados em sequência.

### Personalizações Futuras
Você pode adicionar barras de progresso em qualquer seção que tenha:
- Animações sequenciais
- Passos de tutorial
- Carrosséis
- Etapas de processo
- Qualquer animação com progressão clara

## Comportamento

- A barra **só aparece** quando `targetElement` está visível na viewport
- Usa **IntersectionObserver** para detectar visibilidade
- **Fade in/out suave** quando entra/sai da tela
- **Não interfere** com outras barras de progresso na página
- Cada seção é **completamente independente**
