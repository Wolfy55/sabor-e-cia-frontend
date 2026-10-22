import { Button } from './Button'
import { useCarrinho } from '../context/useCarrinho'
import { formatarPreco } from '../utils/formatarPreco'
import styles from '../styles/components/BarraPedido.module.css'

// Barra fixa no rodapé da tela: só aparece quando há itens no carrinho.
function BarraPedido({ onAbrir }) {
    const { quantidade, total } = useCarrinho()

    if (quantidade === 0) return null

    return (
        <aside className={styles.barra} aria-live='polite'>
            <span className={styles.resumo}>
                {quantidade} {quantidade === 1 ? 'item' : 'itens'} - {formatarPreco(total)}
            </span>
            <Button size='md' onClick={onAbrir}>Ver pedido</Button>
        </aside>
    )
}

export { BarraPedido }
