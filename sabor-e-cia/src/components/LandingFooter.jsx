import { Link } from 'react-router-dom';
import styles from '../styles/components/LandingFooter.module.css'
function LandingFooter() {
    const anoAtual = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <Link
                to="/"
                className={styles.marca}
                aria-label="Sabor e Cia - Página inicial"
            >
                Sabor e Cia.
            </Link>

            <nav
                className={styles.nav}
                aria-label="Links do rodapé"
            >
                <Link to="/" className={styles.link}>
                    Início
                </Link>

                <Link to="/cardapio" className={styles.link}>
                    Cardápio
                </Link>

                <Link to="/sobre" className={styles.link}>
                    Sobre nós
                </Link>

                <a href="/#contato" className={styles.link}>
                    Contato
                </a>
            </nav>

            <p className={styles.copyright}>
                Sabor e Cia. — Cafeteria e panificação
            </p>

            <p className={styles.direitos}>
                © {anoAtual} Sabor e Cia. Todos os direitos reservados.
            </p>
        </footer>
    );
}

export { LandingFooter };
