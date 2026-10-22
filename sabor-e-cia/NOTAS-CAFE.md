# Sabor e cia café — notas do projeto

Este é UM projeto Vite só: a base do Librisca (todos os arquivos originais mantidos) + os arquivos novos do café.
Rodar: `npm install` e depois `npm run dev`. `npm run lint` e `npm run build` passam sem erros.

## O que veio do Librisca e o que fazer
APAGAR quando for limpar (ainda estão no projeto):
  components: AuthenticatedLayout, Sidebar, LoginForm, RegisterForm, PasswordRecoveryForm, TermsOfUseModal,
              LandingBenefits, LandingCTA, LandingFeatures  (+ .module.css de cada)
  context: AuthContext.jsx, AuthStorage.js · services: userService.js · routes/guards/RequireAuth.jsx
  pages: LoginPage, Register, PasswordRecoveryPage (+ css em styles/pages)
  assets: hero.png, react.svg, vite.svg · public: favicon.svg, icons.svg (trocar pelo favicon do café)
ADAPTAR: LandingFooter (virar Rodape), LandingPage (home do café), About (virar Sobre), routeConfig, appRoutes, App.jsx
         (tirar o AuthProvider), PublicLayout (+ ScrollRestoration e Rodape), README.md
VERIFICAR: services/mockStorage.js (pode servir para o carrinho)
MANTER: tokens, Button, Card, Input, Modal, RouteErrorBoundary, NotFoundPage, main.jsx, index.css, configs.

## ARQUIVOS NOVOS DO CAFÉ
components: Header (substitui o do Librisca), LandingHero (substitui), Cardapio, CardProduto, BarraPedido
context/CarrinhoContext.js (só o contexto) · context/useCarrinho.js (hook) · context/CarrinhoProvider.jsx (reducer e Provider)
data/produtos.js · utils/formatarPreco.js · pages/CardapioPage.jsx · assets/logo.jpg
styles: tokens/colors.css (paleta do protótipo do Canva, mesmos nomes) + CSS Modules dos componentes novos

## ALTERAÇÕES FEITAS EM ARQUIVOS DO LIBRISCA
- package.json: nome "sabor-e-cia"; trocado @fontsource/work-sans por @fontsource/outfit.
  Motivo: typography.css importava "@fontsource-variable/fraunces", que NÃO estava no package.json deste projeto
  (só existia no node_modules da pasta de fora), então o projeto não rodava sozinho.
- typography.css: fonte Outfit (display e body).
- Button.module.css: vírgula sobrando no transition removida; texto do .primary usa --on-primary; variante .ghost nova.
- Button.jsx: type="button" como padrão.
- effects.css: sombras reescritas (as originais eram inválidas e nunca apareciam); --shadow-pressed criado
  (era usado e não existia); body usa --text-body; links usam --text-link.
- LandingBenefits.module.css: var(weight-bold) -> var(--weight-bold) (quebrava o build de produção).
- PublicLayout.jsx: id="conteudo-principal" (tinha um "#" a mais, o link "Pular para o conteúdo" não funcionava).
- routeConfig.jsx: rotas /cardapio e /sobre (a /sobre aponta para About por enquanto).
- App.jsx: CarrinhoProvider envolvendo as rotas (AuthProvider mantido por enquanto).
- index.html: lang="pt-BR" e título.

## ERROS DO LINT RESOLVIDOS
- TODOs concluídos: Cardapio (useState, filtro, abas, cards), CardProduto (preço e onAdicionar), BarraPedido
  (esconde vazio, texto, onAbrir), destaques do LandingHero. Testados: adicionar itens, totais, filtro e barra do pedido.
- Fast Refresh: o CarrinhoContext foi separado em 3 arquivos (contexto, hook e Provider).
  No AuthContext ficou um `eslint-disable-next-line` TEMPORÁRIO: apague-o junto com o AuthContext na limpeza.
- eslint.config.js: a pasta `referencia/` é ignorada pelo lint.

## AINDA PENDENTE
- CardapioPage: guardar qual painel está aberto e passar para `onAbrir` da BarraPedido.
- Painéis Carrinho e Pagamento (com Modal); envio do pedido (Softcom); localStorage do carrinho.
- Modal.jsx: guardar onClose numa ref (o foco pula dos campos do formulário).
- Card/Input/Modal: bordas com var(--border-default); Card com var(--surface-card).
- Limpeza do Librisca (lista acima) e a home do café (LandingPage ainda mostra as seções do Librisca).

## referencia/
prototipo-html/  protótipo em HTML/CSS/JS (site.html é o mais recente, com carrinho e pagamento funcionando)
materiais/       logo, print do seu hero e protótipo do Canva
librisca-fora-do-projeto/  o que estava FORA da pasta librisca-frontend no seu zip: imagens/ (identidade do Librisca), estudo.js, .vscode, package.json da raiz (o node_modules daquela pasta de fora não foi incluído)
