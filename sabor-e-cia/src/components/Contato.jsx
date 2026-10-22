
import { Link } from "react-router-dom";
import { MapPin, Clock, Phone } from "lucide-react";
import styles from "../styles/components/Contato.module.css";

function Contato() {
    return (
        <section
            id="contato"
            className={styles.section}
            aria-labelledby="contato-titulo"
        >
            <div className={styles.heading}>
                <p className={styles.eyebrow}>FALE CONOSCO</p>

                <h2 id="contato-titulo">
                    Venha conhecer o Sabor e Cia.
                </h2>

                <p>
                    Quer conhecer nossa cafeteria e panificação?
                    Em breve, você encontrará aqui todas as informações
                    para nos visitar.
                </p>
            </div>

            <div className={styles.details}>
                <article className={styles.item}>
                    <MapPin aria-hidden="true" size={24} />

                    <h3>Endereço</h3>

                    <p>
                        <span>Rua Bom Jesus, 439 - Centro - Pouso Alegre.</span>
                    </p>
                </article>

                <article className={styles.item}>
                    <Clock aria-hidden="true" size={24} />

                    <h3>Horários</h3>

                    <p>
                        <span>Sábado:</span><p>07:00 - 13:00</p>
                        <span>Segunda a Sexta:</span><p>07:00 - 19:00</p>
                    </p>
                </article>

                <article className={styles.item}>
                    <Phone aria-hidden="true" size={24} />

                    <h3>Telefone</h3>

                    <p>
                        (55) 3599912-0407
                    </p>
                </article>
            </div>

            <Link to="/cardapio" className={styles.link}>
                Confira nosso cardápio
            </Link>
        </section>
    );
}

export { Contato };
