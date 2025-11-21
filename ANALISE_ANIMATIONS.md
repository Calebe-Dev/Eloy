# Análise Detalhada das Animações de Scroll

Este documento detalha o funcionamento das principais animações e efeitos visuais implementados no projeto, com foco na replicação em outros contextos. As animações são modulares e construídas com componentes Svelte.

## 1. Revelar ao Rolar (`ScrollReveal.svelte`)

Este é um componente de propósito geral para animar elementos quando eles entram na área visível da tela (viewport).

### Mecanismo Principal

- **API `IntersectionObserver`**: O componente usa a `IntersectionObserver` para detectar de forma eficiente quando o elemento está visível.
- **Transições de CSS**: Uma vez que o elemento é detectado, uma transformação de CSS é aplicada para criar a animação. O estado inicial (invisível) é definido via CSS (ex: `transform: translateY(60px); opacity: 0;`) e o estado final (visível) é a ausência dessas transformações (`transform: translateY(0); opacity: 1;`). A suavidade é garantida pela propriedade `transition` do CSS.

### Como Funciona

1.  **Observação**: `onMount`, um `IntersectionObserver` é ativado para observar o `div` principal do componente.
2.  **Entrada na Viewport**: Quando o elemento cruza o `threshold` definido (ex: 15% visível), o callback do observer é disparado.
3.  **Ativação do Estado**: Uma variável de estado `isInView` é definida como `true`.
4.  **Reatividade de Estilo**: As propriedades de estilo (`transform`, `opacity`, `filter`) são reativas (`$derived`) e mudam com base no estado de `isInView`, acionando a transição de CSS.
5.  **Execução Única**: Por padrão (`once = true`), o observador é desconectado após a primeira animação para economizar recursos.

### Como Replicar

Crie um componente Svelte que:
a. Receba o conteúdo a ser animado como `children` (snippet).
b. Use `bind:this` para obter a referência do elemento DOM.
c. Em `onMount`, crie um `IntersectionObserver` que altera uma variável de estado (ex: `isVisible`).
d. No HTML, aplique classes ou estilos dinamicamente com base na variável `isVisible`.

```svelte
<!-- Exemplo de uso do ScrollReveal.svelte -->
<ScrollReveal animation="fade-up" delay={200}>
  <h2>Título que aparece ao rolar</h2>
</ScrollReveal>
```

---

## 2. Sequência Coreografada com Scroll Pinning (`ProblemReveal.svelte`)

Este componente é mais complexo e cria uma cena de "storytelling" que progride conforme o usuário rola a página, mantendo o conteúdo fixo no centro da tela.

### Mecanismo Principal

- **Scroll Pinning (Fixação de Scroll)**: A técnica central envolve um `div` wrapper com uma altura muito maior que a da tela (ex: `300vh`). Dentro dele, o `div` do conteúdo principal é definido como `position: sticky` e `top: 0`. Isso faz com que o conteúdo permaneça "fixado" na tela enquanto o usuário rola a altura do wrapper.
- **Cálculo de Progresso de Scroll**: Um listener de scroll no `window` calcula o progresso da rolagem *dentro* do wrapper (de 0% a 100%).
- **Animação Reativa**: Variáveis de estado (`scrollProgress`, `visibleIndex`) são atualizadas com base no progresso. Essas variáveis controlam reativamente a opacidade, transformação e visibilidade dos elementos da cena (textos, indicadores, fundos).

### Como Funciona

1.  **Estrutura**: Um `div` externo de `300vh` força uma longa área de scroll. O `div` interno de `100vh` com `position: sticky` contém toda a animação.
2.  **Rastreamento**: O evento `scroll` da `window` é usado para calcular o quão "fundo" o usuário já rolou dentro da seção de `300vh`. O progresso é normalizado para um valor entre 0 e 1.
3.  **Troca de Conteúdo**: O progresso é usado para determinar qual dos blocos de texto deve estar visível (`visibleIndex`). A transição entre eles é feita animando `opacity`, `transform` e `filter: blur()`.
4.  **Efeitos de Parallax**: A mesma variável `scrollProgress` é usada para animar sutilmente a posição de elementos de fundo, criando um efeito de profundidade (parallax).

### Como Replicar

1.  Crie a estrutura HTML com um container "espaçador" e um container "sticky".
2.  Adicione um listener de scroll em `onMount` para calcular o progresso da rolagem relativo ao container espaçador.
3.  Armazene o progresso em uma store ou variável de estado (`$state`).
4.  Use declarações reativas (`$:`) ou `derived stores` para mapear o progresso a estilos CSS (`opacity`, `transform`, etc.) dos elementos que você quer animar.

---

## 3. Animação de Contador Numérico (`CounterAnimation.svelte`)

Anima um número de 0 até um valor alvo quando o componente se torna visível.

### Mecanismo Principal

- **`IntersectionObserver`**: Assim como o `ScrollReveal`, ele usa um observer para detectar quando o elemento entra na tela.
- **`requestAnimationFrame`**: Em vez de usar transições de CSS, a animação é feita em JavaScript para ter controle total sobre o valor numérico em cada quadro (frame).
- **Função de Easing**: Uma função matemática de "easing" (como `easeOutCubic`) é usada para calcular o valor em cada passo da animação, criando uma aceleração e desaceleração suaves em vez de um incremento linear.

### Como Funciona

1.  **Observação**: `IntersectionObserver` aguarda o elemento ficar visível.
2.  **Início da Animação**: Ao se tornar visível, a função `animateCount` é chamada.
3.  **Loop de Animação**:
    - `requestAnimationFrame(animate)` agenda a execução da função `animate` no próximo ciclo de renderização do navegador.
    - Dentro de `animate`, o tempo decorrido desde o início é calculado para determinar o progresso da animação (um valor de 0 a 1).
    - O progresso é passado pela função de easing.
    - O valor numérico (`count`) é atualizado com base no progresso "suavizado".
    - Se o progresso for menor que 1, um novo frame é solicitado.
4.  **Renderização**: O Svelte reage às mudanças na variável `count` e atualiza o DOM eficientemente.

### Como Replicar

1.  Crie um componente que usa `IntersectionObserver` para acionar uma função.
2.  Nessa função, implemente um loop com `requestAnimationFrame`.
3.  Calcule o progresso da animação baseado no tempo.
4.  Aplique uma função de easing ao progresso e atualize o valor que será exibido na tela.

---

## 4. Indicador de Progresso da Seção (`ScrollProgressBar.svelte`)

Este componente mostra um indicador visual (bolinhas) que representa em qual "passo" de uma seção o usuário está.

### Mecanismo Principal

- **Reatividade a Props**: O componente não tem lógica de scroll própria. Ele é "burro" e simplesmente reflete o estado que recebe via props (`totalSteps`, `currentStep`).
- **Visibilidade Condicional**: Ele também usa `IntersectionObserver` para saber se deve ser exibido, baseado na visibilidade de um `targetElement` (a seção inteira que ele representa).
- **Renderização Dinâmica**: A interface é renderizada com um loop (`#each`) que cria uma "bolinha" para cada passo. A aparência de cada bolinha (cor, tamanho) é controlada dinamicamente com classes CSS baseadas no `currentStep`.

### Como Funciona

1.  **Observação do Alvo**: O componente observa o `targetElement` (por exemplo, a seção `ProblemReveal`). Ele só fica visível (`isVisible = true`) quando essa seção está na tela.
2.  **Recebimento de Estado**: O componente pai (ex: `ProblemReveal`) calcula o passo atual (`currentStep`) e o passa para o `ScrollProgressBar`.
3.  **Renderização Reativa**: O `ScrollProgressBar` itera de 0 a `totalSteps`. Para cada `index`, ele compara com `currentStep` e aplica a classe CSS correta (`bg-white` para passos concluídos, `bg-gray-500` para futuros).

Este componente é um ótimo exemplo de como desacoplar a lógica de estado (o cálculo do progresso) da lógica de apresentação (a exibição do progresso).
