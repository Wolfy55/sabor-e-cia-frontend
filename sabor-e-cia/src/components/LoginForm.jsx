import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from './Button'
import { Card } from './Card'
import { Input } from './Input'
import styles from '../styles/components/LoginForm.module.css'
import { useAuth } from "../context/AuthContext";
import { z } from 'zod'

const scheme = z.object({
   email: z.string().min(1, "Informe seu e-mail.").email("E-mail inválido."),
   password: z.string().min(1, "Informe sua senha"),
})

function LoginForm(){
    const { login } = useAuth()
    const navigate = useNavigate()
    const [credentialsError, setCredentialsError] = useState(null)

    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm({resolver: zodResolver(scheme) })

    async function uponSubmission(datas){
      setCredentialsError(null)
      const user = await login(datas.email, datas.password)

      if(!user){
         setCredentialsError("E-mail ou senha incorretos.")
         return
      }

      navigate('/dashboard')
    }

    return(
    <Card className={styles.card}>
        <h1 className={styles.title}>Entrar</h1>
        <form
         onSubmit={handleSubmit(uponSubmission)}
         className={styles.form}
         noValidate>
            <Input
             label="E-mail"
             id="email"
             type="email"
             placeholder="voce@exemplo.com"
             error={errors.email?.message}
             {...register("email")}/>

             <Input
             label="Senha"
             id="password"
             type="password"
             placeholder="•••••••"
             error={errors.password?.message}
             {...register("password")}/>

             {credentialsError && (
                <p role="alert" className={styles.generalError}>
                    {credentialsError}
                </p>
             )}
             <Button type="submit" variant="primary" disabled={isSubmitting}>
                Entrar
             </Button>
         </form>
         <p className={styles.footer}>
            Não tem conta? <Link to='/register'>Cadastre-se</Link>
         </p>
         <p className={styles.footer}>
            <Link to='/password-recovery'>Esqueci minha senha</Link>
         </p>
    </Card>
    )
} export {LoginForm}