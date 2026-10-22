import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { Button } from './Button'
import { Card } from './Card'
import { Input } from './Input'
import styles from '../styles/components/PasswordRecoveryForm.module.css'

const scheme = z.object({
    email: z.string().min(1, 'Informe seu e-mail.').email('E-mail inválido.'),
})
function PasswordRecoveryForm(){
    const [send, setSend] = useState(false)
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm({resolve: zodResolver(scheme) })
    async function uponSubmission(){
        setSend(true)
    }
    if(send){
        return(
            <Card className={styles.card}>
                <h1 className={styles.title}>Verifique seu e-mail</h1>
                <p className={styles.message}>
                    Se esse e-mail estiver cadastrado, enviamos instruções para redefinir sua senha.
                </p>
                <Link to='/login' className={styles.link}>
                    Voltar para o login
                </Link>
            </Card>
        )
    }
    return(
        <Card className={styles.card}>
            <h1 className={styles.title}>Recuperar senha</h1>
            <p className={styles.message}>Informe seu e-mail e enviaremos instruções de recuperação.</p>
            <form onSubmit={handleSubmit(uponSubmission)} className={styles.form} noValidate>
                <Input
                 label="E-mail"
                 id="email"
                 type="email"
                 placeholder="voce@exemplo"
                 autoComplete="email"
                 error={errors.email?.message}
                 {...register('email')}/>

                 <Button type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar instruções"}
                </Button>
            </form>
            <p className={styles.footer}>
                <Link to='/login'>Voltar para o login</Link>
            </p>
        </Card>
    )
}
export {PasswordRecoveryForm}