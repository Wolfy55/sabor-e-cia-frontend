import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from './Button';
import { Card } from './Card';
import { Input } from './Input';
import { TermsOfUseModal } from './TermsOfUseModal';
import styles from '../styles/components/RegisterForm.module.css';
import { useAuth } from "../context/AuthContext";
import { z } from 'zod'

const scheme = z
    .object({
        name: z.string().min(1, "Informe seu nome."),
        email: z.string().min(1, "Informe seu e-mail."),
        password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres."),
        confirmPassword: z.string().min(1, "Confirme sua senha."),
        acceptTerms: z
        .boolean()
        .refine((value) => value === true, {message: "É preciso aceitar os termos de uso."}),
    })
    .refine((datas) => datas.password === datas.confirmPassword, {
        message: "As senhas não conferem.",
        path: ['confimPassword'],
    })

function RegisterForm(){
    const navigate = useNavigate()
    const { register: registerUser } = useAuth()
    const [registerError, setRegisterError] = useState(null)
    const [openTerms, setOpenTerms] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({resolver: zodResolver(scheme), defaultValues: {acceptTerms: false} })

    async function uponSubmission(datas){
        setRegisterError(null)
        try{
            await registerUser({ name: datas.name, email: datas.email, password: datas.password })
            navigate('/dashboard')
        } catch (error) {
            setRegisterError(error.message)
        }
    }

    return(
        <Card className={styles.card}>
            <h1 className={styles.title}>Criar conta</h1>

            <form
             onSubmit={handleSubmit(uponSubmission)}
             className={styles.form}
             noValidate>

                <Input
                 label="Nome"
                 id="name"
                 placeholder="Seu nome"
                 autoComplete="name"
                 error={errors.name?.message}
                 {...register("name")}/>
             
                <Input
                 label="E-mail"
                 id="email"
                 type="email"
                 placeholder="voce@exemplo.com"
                 autoComplete="email"
                 error={errors.email?.message}
                 {...register("email")}/>

                <Input
                 label="Senha"
                 id="password"
                 type="password"
                 placeholder="••••••"
                 autoComplete="new-password"
                 error={errors.password?.message}
                 {...register("password")}/>
             
                <Input
                 label="Confirmar senha"
                 id="confirmpassword"
                 type="password"
                 placeholder="••••••"
                 autoComplete="new-password"
                 error={errors.confirmPassword?.message}
                 {...register("confirmPassword")}/>

                 <div className={styles.termsCamp}>
                    <label className={styles.terms}>
                        <input
                         type="checkbox"
                         className={styles.checkbox}
                         {...register("acceptTerms")}/>

                         <span>
                            Ao continuar, você aceita os{' '}

                            <button
                             type="button"
                             className={styles.linkTerms}
                             onClick={() => setOpenTerms(true)}>
                                termos de uso
                             </button>

                             {' '}do ToDo-List
                         </span>
                    </label>
                    {errors.acceptTerms && (
                        <p role="alert" className={styles.generalError}>
                            {errors.acceptTerms.message}
                        </p>
                    )}
                 </div>

                 {registerError && (
                    <p role="alert" className={styles.generalError}>
                        {registerError}
                    </p>
                 )}

                 <Button type="submit" variant="primary" disabled={isSubmitting}>
                    Criar conta
                 </Button>
            </form>

            <p className={styles.footer}>
                Já tem conta? <Link to='/login'>Entrar</Link>
            </p>

            <TermsOfUseModal
             open={openTerms}
             onClose={() => setOpenTerms(false)}/>
        </Card>
    )
}

export {RegisterForm}