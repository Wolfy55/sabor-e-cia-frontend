import { useState } from 'react'
import { categorias, produtos } from '../data/produtos'
import { CardProduto } from './CardProduto'
import { useCarrinho } from '../context/useCarrinho'
import styles from '../styles/components/Cardapio.module.css'

function Cardapio() {
    const { adicionar } = useCarrinho()
    const [categoriaAtiva, setCategoriaAtiva] = useState('todos')

    const produtosFiltrados = categoriaAtiva === 'todos'
        ? produtos
        : produtos.filter((produto) => produto.categoria === categoriaAtiva)

    return (
        <section className={styles.cardapio} id='cardapio' aria-labelledby='cardapio-titulo'>
            <h2 id='cardapio-titulo' className={styles.titulo}>Nosso cardápio</h2>
            <p className={styles.texto}>Escolha seus itens e a gente prepara para você.</p>

            <nav className={styles.abas} aria-label='Categorias do cardápio'>
                <ul className={styles.abasLista}>
                    {categorias.map((categoria) => {
                        const ativa = categoria.id === categoriaAtiva
                        return (
                            <li key={categoria.id}>
                                <button
                                    type='button'
                                    className={`${styles.aba} ${ativa ? styles.abaAtiva : ''}`}
                                    aria-pressed={ativa}
                                    onClick={() => setCategoriaAtiva(categoria.id)}
                                >
                                    {categoria.nome}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <div className={styles.grade}>
                {produtosFiltrados.map((produto) => (
                    <CardProduto key={produto.id} produto={produto} onAdicionar={adicionar} />
                ))}
            </div>

            {produtosFiltrados.length === 0 && (
                <p className={styles.texto}>Nenhum item nesta categoria por enquanto.</p>
            )}
        </section>
    )
}

export { Cardapio }
