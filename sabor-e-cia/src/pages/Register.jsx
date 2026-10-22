import { RegisterForm } from '../components/RegisterForm'
import styles from '../styles/pages/RegisterPage.module.css'

function RegisterPage(){
    return(
        <div className={styles.wrapper}>
            <RegisterForm/>
        </div>
    )
}
export {RegisterPage}