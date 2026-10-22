import { Link } from 'react-router-dom'
import styles from '../styles/components/LandingHero.module.css'
import ButtonStyles from '../styles/components/Button.module.css'
// TODO: quando tiver a foto real, importar aqui: import fotoHero from '../assets/hero.jpg'

// TODO: se preferir, mover estes textos para um arquivo em src/data/
const destaques = [
    { titulo: 'Mais de 3 anos', texto: 'servindo Pouso Alegre' },
    { titulo: 'Espaço familiar', texto: 'aconchegante para toda a família' },
    { titulo: 'Peça pelo celular', texto: 'escolha no cardápio e a gente prepara' },
]

function LandingHero() {
    return (
        <section className={styles.hero} aria-labelledby='hero-titulo'>
            <div className={styles.conteudo}>
                <p className={styles.selo}>Cafeteria e panificação</p>
                <h1 id='hero-titulo' className={styles.titulo}>
                    O sabor de casa, feito todo dia.
                </h1>
                <p className={styles.texto}>
                    Pães quentinhos, bolos, tortas e o café que você gosta, num espaço
                    aconchegante para toda a família.
                </p>
                <div className={styles.acoes}>
                    {/* TODO: mesmo destino de "Fazer Pedido" na Navbar */}
                    <Link
                        to='/cardapio'
                        className={`${ButtonStyles.button} ${ButtonStyles.primary} ${ButtonStyles.lg}`}
                    >
                        Ver cardápio
                    </Link>
                    <Link
                        to='/sobre'
                        className={`${ButtonStyles.button} ${ButtonStyles.ghost} ${ButtonStyles.lg}`}
                    >
                        Conhecer o espaço
                    </Link>
                </div>
            </div>

            <figure className={styles.foto}>
                {/* TODO: trocar o bloco abaixo por <img src={fotoHero} alt='Bolo de pistache na mesa da cafeteria' /> */}
                <div className={styles.fotoVazia}>Foto do bolo ou do salão</div>
                <figcaption className={styles.etiqueta}>
                    <strong>Pouso Alegre</strong>
                    <span>Sul de Minas</span>
                </figcaption>
            </figure>

            <ul className={styles.destaques}>
                {destaques.map((destaque) => (
                    <li key={destaque.titulo}>
                        <strong>{destaque.titulo}</strong>
                        <span>{destaque.texto}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export { LandingHero }
