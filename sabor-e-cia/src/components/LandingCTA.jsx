import { Link } from "react-router-dom";
import styles from '../styles/components/LandingCTA.module.css'
import ButtonStyles from '../styles/components/Button.module.css'

function LandingCTA(){
    return(
        <section className={styles.section}>
            <h2 className={styles.title}>Pronto para organizar sua rotina?</h2>
            <Link to='/register' className=
                            {`${ButtonStyles.button}
                            ${ButtonStyles.primary}
                            ${ButtonStyles.lg}
                            `}>Comece agora</Link>
        </section>
    )
}export {LandingCTA}