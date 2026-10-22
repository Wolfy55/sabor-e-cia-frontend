import { PasswordRecoveryForm } from '../components/PasswordRecoveryForm'
import styles from '../styles/pages/PasswordRecoveryPage.module.css'

function PasswordRecoveryPage(){
    return(
        <div className={styles.wrapper}>
            <PasswordRecoveryForm/>
        </div>
    )
}
export {PasswordRecoveryPage}