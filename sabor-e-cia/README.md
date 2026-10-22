# Paleta de Cores

## 1. Cores Principais

As cores principais representam a identidade visual da marca e devem ser utilizadas nos elementos mais importantes da interface.

| Cor | HEX | Token | Uso |
|---|---|---|---|
| Marrom médio | `#592A0F` | `primary` | Ações principais e elementos de destaque |
| Marrom médio escuro | `#3F1B06FF` | `primary-dark` | Hover, foco e estados pressionados |
| Bege areia | `#BFA58E` | `secondary` | Ações secundárias e elementos de apoio |
| Bege areia escuro | `#967B64FF` | `secondary-dark` | Hover e estados ativos |

---

## 2. Cores Neutras

As cores neutras são utilizadas para estruturar a interface e criar hierarquia entre fundos, cards, textos e bordas.

| Cor | HEX | Token | Uso |
|---|---|---|---|
| Bege claro | `#F2E5D5` | `background` | Fundo principal da aplicação |
| Bege mais claro & Linho | `#F3DFC8` & `#F8F1E7`  | `surface` | Cards, painéis e áreas de conteúdo |
| Linho | `#F8F1E7` | `surface-raised` | Modais, dropdowns e elementos elevados |
| Marrom café escuro | `#261307` | `on-surface` | Títulos e textos principais |
| Marrom claro | `#8C5B3F` | `on-surface-muted` | Descrições e informações secundárias |
| Marrom médio | `#592A0F` | `outline` | Bordas e divisores |

---

## 3. Cores de Estado

As cores de estado comunicam situações específicas para o usuário.

| Estado | HEX | Token | Uso |
|---|---|---|---|
| Oliva | `#5B7B5A` | `success` | Operações realizadas com sucesso |
| Âmbar | `#C77D3D` | `warning` | Alertas e situações que exigem atenção |
| Vermelho coral | `#A8453B` | `danger` | Erros e ações destrutivas |
| Marrom claro | `#8C5B3F` | `accent` | Informações ou elementos de destaque |

---

## 4. Tokens de Design

Os componentes da interface devem utilizar **tokens semânticos** em vez de valores HEX diretamente.

Isso facilita a manutenção do projeto e permite alterar a identidade visual sem precisar modificar todos os componentes individualmente.

```css
:root {

  /* ================================
     CORES DE FUNDO E SUPERFÍCIE
     ================================ */

  --background: #F2E5D5;
  --surface: #F8F1E7;
  --surface-raised: #F8F1E7;


  /* ================================
     TEXTOS E CONTRASTES
     ================================ */

  --on-surface: #261307;
  --on-surface-muted: #8C5B3F;
  --outline: #592A0F;


  /* ================================
     CORES DA MARCA
     ================================ */

  --primary: #592A0F;
  --primary-dark: #3F1B06FF;

  --secondary: #BFA58E;
  --secondary-dark: #967B64FF;


  /* ================================
     CORES DE DESTAQUE E ESTADOS
     ================================ */

  --accent: #8C5B3F;

  --success: #5B7B5A;
  --warning: #C77D3D;
  --danger: #A8453B;


  /* ================================
     CORES DE TEXTO
     ================================ */

  --text-heading: var(--on-surface);
  --text-body: var(--on-surface);
  --text-muted: var(--on-surface-muted);
  --text-inverse: var(--surface-raised);

  --text-link: var(--primary-dark);
  --text-link-hover: var(--primary);


  /* ================================
     SUPERFÍCIES
     ================================ */

  --surface-page: var(--background);
  --surface-card: var(--surface);
  --surface-sunken: var(--background);


  /* ================================
     BORDAS
     ================================ */

  --border-subtle: var(--outline);
  --border-default: var(--outline);


  /* ================================
     ACENTOS
     ================================ */

  --accent-primary: var(--primary);
  --accent-primary-hover: var(--primary-dark);

  --accent-secondary: var(--secondary);
  --accent-secondary-hover: var(--secondary-dark);


  /* ================================
     ACESSIBILIDADE
     ================================ */

  --focus-ring: var(--primary);
}
```

## Tipografia

## fontes utilizadas
- Fraunces 
- Work Sans


# Scrollbar

Personaliza a barra de rolagem da página, deixando-a mais fina e adequada ao estilo visual do projeto.

```css
* {
    scrollbar-width: thin; /* Deixa a barra de rolagem mais fina */
    scrollbar-color: var(--on-surface-muted) transparent; /* Define a cor do indicador */
}

/* Personaliza a barra de rolagem para navegadores Chromium/WebKit */
*::-webkit-scrollbar {
    width: var(--space-2);  /* Largura da barra */
    height: var(--space-2); /* Altura da barra */
}

/* Fundo da área de rolagem */
*::-webkit-scrollbar-track {
    background: var(--on-surface-muted);
    border-radius: var(--radius-pill);
}

/* Aparência do indicador de rolagem */
*::-webkit-scrollbar-thumb {
    background: var(--on-surface-muted);
    border-radius: var(--radius-pill);
}

/* Efeito ao passar o mouse */
*::-webkit-scrollbar-thumb:hover {
    background: var(--on-surface);
}
```

## Efeitos

Define variáveis para **bordas arredondadas, sombras e animações**, além de estilos básicos para a página e links.

```css
:root {
    /* ---- Bordas arredondadas --------------------------------------------- */
    --radius-clay-sm: 16px;
    --radius-clay-md: 24px;
    --radius-clay-lg: 32px;
    --radius-clay-full: 999px;

    --radius-sm: var(--radius-clay-sm);
    --radius-md: var(--radius-clay-md);
    --radius-lg: var(--radius-clay-lg);
    --radius-pill: var(--radius-clay-full);

    /* ---- Sombras --------------------------------------------------------- */
    --shadow-clay-sm:
        -4px -4px 8px rgba(255, 255, 255, 0.7),
        4px 4px 8px rgba(174, 141, 112, 0.25);

    --shadow-clay-md:
        -8px -8px 16px rgba(255, 255, 255, 0.7),
        8px 8px 16px rgba(174, 141, 112, 0.25);

    --shadow-clay-lg:
        -12px -12px 32px rgba(255, 255, 255, 0.7),
        12px 12px 32px rgba(174, 141, 112, 0.25);

    --shadow-sm: var(--shadow-clay-sm);
    --shadow-md: var(--shadow-clay-md);
    --shadow-lg: var(--shadow-clay-lg);

    /* ---- Animações ------------------------------------------------------- */
    --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-out: cubic-bezier(0, 0, 0.2, 1);

    --duration-fast: 150ms;
    --duration-base: 200ms;
    --duration-slow: 300ms;
}

/* ---- Configurações gerais ----------------------------------------------- */
* {
    box-sizing: border-box;
}

body {
    background: var(--surface-page);
    color: var(--text-link);
    font-family: var(--font-body);
    margin: 0;
}

/* ---- Links --------------------------------------------------------------- */
a {
    color: var(--text-link);
    text-decoration: none;
    font-weight: var(--weight-semibold);
}

a:hover {
    color: var(--text-link-hover);
}
```

## Espaçamento

Define variáveis para padronizar o **espaçamento entre elementos** e limitar a largura dos conteúdos da página.

```css
:root {
    /* ---- Espaçamentos ---------------------------------------------------- */
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-5: 20px;
    --space-6: 24px;
    --space-7: 28px;
    --space-8: 32px;
    --space-10: 40px;
    --space-12: 48px;
    --space-16: 64px;
    --space-20: 80px;

    /* ---- Largura dos containers ----------------------------------------- */
    --container-max: 1200px;
    --container-narrow: 600px;
}
```

## Breakpoints

Define os pontos de quebra utilizados para adaptar o layout a diferentes tamanhos de tela, garantindo a **responsividade da página**.

```css
:root {
    --breakpoint-tablet: 768px;
    --breakpoint-desktop: 1024px;
}
```
