import { Coffee, Heart, MapPin, Utensils } from "lucide-react";
import styles from '../styles/pages/About.module.css'

const DIFERENCIAIS = [
    { icon: Coffee, title: "Café e bons sabores", description: "Um espaço para apreciar café, pães, bolos e outras delícias." },
    { icon: Heart, title: "Acolhimento", description: "Queremos proporcionar uma experiência agradável a cada visita." },
    { icon: Utensils, title: "Nossos produtos", description: "Uma seleção de produtos de cafeteria e panificação." },
    { icon: MapPin, title: "Sul de Minas", description: "Uma cafeteria localizada em Pouso Alegre, Minas Gerais." },
];

function About() {
    return (
        <main className={styles.wrapper}>
            <header className={styles.header}>
                <h1 className={styles.title}>Sobre o Sabor e cia</h1>
                <p className={styles.subtitle}>Café, panificação e bons momentos.</p>
            </header>
            <section className={styles.card}>
                <p className={styles.description}>
                    O Sabor e cia é uma cafeteria e panificação em Pouso Alegre, no Sul de Minas Gerais.
                    Nosso objetivo é oferecer um ambiente acolhedor para quem deseja apreciar bons sabores
                    e aproveitar momentos especiais.
                </p>
                <div className={styles.grade}>
                    {DIFERENCIAIS.map(({ icon: Icon, title, description }) => (
                        <article key={title} className={styles.item}>
                            <span className={styles.iconWrapper} aria-hidden="true"><Icon size={20} /></span>
                            <h2 className={styles.itemTitle}>{title}</h2>
                            <p className={styles.itemDescription}>{description}</p>
                        </article>
                    ))}
                </div>
                <div className={styles.credits}>
                    <p className={styles.creditsLine}>Conheça nossos produtos e visite nosso espaço!</p>
                </div>
            </section>
        </main>
    );
}

export { About };
