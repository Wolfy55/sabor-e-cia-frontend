
import styles from "../styles/components/NossoEspaco.module.css";

function NossoEspaco() {
    return (
        <section
            id="nosso-espaco"
            className={styles.section}
            aria-labelledby="espaco-titulo"
        >
            <div className={styles.intro}>
                <p className={styles.eyebrow}>NOSSO ESPAÇO</p>

                <h2 id="espaco-titulo">
                    Um cantinho especial para você
                </h2>

                <p>
                    Um ambiente acolhedor para aproveitar um bom café,
                    saborear algo gostoso e compartilhar bons momentos.
                </p>
            </div>

            <div className={styles.gallery}>
                <figure className={styles.photo}>
                    <img
                        className={styles.image}
                        src="/images/salao.jpg"
                        alt="Interior da cafeteria"
                        loading="lazy"
                    />
                    <figcaption>
                        Um espaço para reunir pessoas
                    </figcaption>
                </figure>

                <figure className={styles.photo}>
                    <img
                        className={styles.image}
                        src="/images/produtos.jpg"
                        alt="Pães e produtos da padaria"
                        loading="lazy"
                    />
                    <figcaption>
                        Sabores preparados com carinho
                    </figcaption>
                </figure>

                <figure className={styles.photo}>
                    <img
                        className={styles.image}
                        src="/images/cafe.jpg"
                        alt="Xícara de café servida à mesa"
                        loading="lazy"
                    />
                    <figcaption>
                        Seu momento de pausa
                    </figcaption>
                </figure>
            </div>
        </section>
    );
}

export { NossoEspaco };
