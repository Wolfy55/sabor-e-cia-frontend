// Categorias das abas. A chave "todos" mostra tudo.
const categorias = [
    { id: 'todos', nome: 'Todos' },
    { id: 'cafes', nome: 'Cafés' },
    { id: 'bolos', nome: 'Bolos' },
    { id: 'paes', nome: 'Pães' },
    { id: 'tortas', nome: 'Tortas e sobremesas' },
    { id: 'salgados', nome: 'Salgados' },
]

// Preço sempre como número (18, 12.5), nunca como texto.
// TODO: trocar pelos itens, descrições e preços reais do cliente.
// TODO: quando tiver as fotos, importar cada uma ou guardar o caminho em "foto" (ex.: '/assets/torta-pistache.jpg').
const produtos = [
    {
        id: 'torta-pistache',
        nome: 'Torta de Pistache',
        descricao: 'Torta cremosa de pistache, com massa crocante e recheio macio.',
        preco: 18,
        categoria: 'tortas',
        foto: null,
    },
    {
        id: 'torta-limao',
        nome: 'Torta de Limão',
        descricao: 'Torta de limão com massa crocante e recheio cremoso, na medida certa.',
        preco: 18,
        categoria: 'tortas',
        foto: null,
    },
    {
        id: 'pao-cebola',
        nome: 'Pão de cebola',
        descricao: 'Pão saborizado de cebola.',
        preco: 18,
        categoria: 'paes',
        foto: null,
    },
]

export { categorias, produtos }
