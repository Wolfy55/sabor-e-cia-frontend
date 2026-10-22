import { Button } from './Button'
import { formatarPreco } from '../utils/formatarPreco'
import styles from '../styles/components/CardProduto.module.css'

function CardProduto({ produto, onAdicionar }) {
    const { nome, descricao, preco, foto } = produto

    return (
        <article className={styles.card}>
            {foto ? (
                <img className={styles.foto} src={foto} alt={nome} loading='lazy' />
            ) : (
                <div className={styles.fotoVazia}>Foto do produto</div>
            )}

            <div className={styles.corpo}>
                <h3 className={styles.nome}>{nome}</h3>
                <p className={styles.descricao}>{descricao}</p>

                <div className={styles.rodape}>
                    <span className={styles.preco}>{formatarPreco(preco)}</span>
                    <Button size='sm' onClick={() => onAdicionar?.(produto)}>Adicionar</Button>
                </div>
            </div>
        </article>
    )
}

export { CardProduto }
