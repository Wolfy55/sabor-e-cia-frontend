import { Link } from 'react-router-dom'
import styles from '../styles/components/Header.module.css'
import ButtonStyles from '../styles/components/Button.module.css'
// TODO: colocar a logo em src/assets/logo.jpg (ou ajustar o caminho)
import logo from '../assets/logo.jpg'

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <Link to='/' className={styles.logo}>
                    <img src={logo} alt='Sabor e cia, cafeteria e panificação' width='56' height='56' />
                </Link>

                {/* TODO: escolher a frase decorativa final com o cliente */}
                <p className={styles.frase}>Pão quentinho, café na hora</p>

                <nav className={styles.acoes} aria-label='Navegação principal'>
                    {/* TODO: definir o destino do pedido: '/cardapio' (página separada) ou '/#cardapio' (seção da home) */}
                    <Link
                        to='/cardapio'
                        className={`${ButtonStyles.button} ${ButtonStyles.primary} ${ButtonStyles.md}`}
                    >
                        Fazer Pedido
                    </Link>
                    {/* TODO (opcional): trocar Link por NavLink para destacar a página atual */}
                    <Link
                        to='/sobre'
                        className={`${ButtonStyles.button} ${ButtonStyles.ghost} ${ButtonStyles.md}`}
                    >
                        Sobre nós
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export { Header }
