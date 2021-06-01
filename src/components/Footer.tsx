import Link from 'next/link'

import { useRef, useState } from 'react'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import Input from './Input'

import styles from '../styles/components/footer.module.scss'
import api from '../services/api'
import { array } from 'yup/lib/locale'

interface FormData {
    name: string
    email: string
}

export default function Footer() {

    const [submitFormm, setSubmitForm] = useState(false)

    const formRef = useRef<FormHandles>(null)

    const handleSubmit: SubmitHandler<FormData> = async data => {
        try {
            formRef.current.setErrors({})

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string().email().required()
            })

            await schema.validate(data, { abortEarly: false })
            const response = await api.post('/newsletter', {...data})
            console.log(response)
            
            setSubmitForm(true)
        }  catch (err) {
            const validationError = {}

            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    console.log(error.path)
                    validationError[error.path] = error.path === 'name' ? 'Preencha com seu nome completo!' 
                    : 'Preencha com um e-mail válido!'
                })

                formRef.current.setErrors(validationError)
            }
        }
    }

    return (
        <footer className={styles.footerContainer}>
            <div className={styles.formContainer}>
                {!submitFormm ? (
                    <>
                        <h3>Participe de nossas news com promoções e novidades!</h3>

                        <Form ref={formRef} onSubmit={handleSubmit} autoComplete='true'>
                            <Input name="name" placeholder="Digite seu nome" />

                            <Input name="email" placeholder="Digite seu email" type="email"/>

                            <button>Eu quero!</button>
                        </Form>
                    </>
                ) : (
                    <div className={styles.sendForm}>
                        <h3>Seu e-mail foi cadastrado com sucesso!</h3>
                        <p>A partir de agora você receberá as novidade e ofertas exclusivas.</p>

                        <button
                            onClick={()=> setSubmitForm(false)}
                        >Cadastrar novo e-mail</button>
                    </div>
                )}
            </div>

            <div className={styles.content}>
                <div>
                    <h2>Localização</h2>
                    <hr />
                    <p>Avenida Andrômeda, 2000. Bloco 6 e 8 <br />
                        Alphavile SP <br />
                        brasil@corebiz.ag <br />
                        +55 11 3090 1039</p>
                </div>
                <div>
                    <Link href="/">
                        <a >
                            <img src="/icon/email.svg" alt="Entre em contato" />
                            <p>Entre em contato</p>
                        </a>
                    </Link>
                    <Link href="/">
                        <a >
                            <img src="/icon/contato.svg" alt="Fale com um consultor" />
                            <p>FALE COM O NOSSO CONSULTOR ONLINE</p>
                        </a>
                    </Link>
                </div>

                <div className={styles.creditsContainer}>
                    <div>
                        <p>Create by</p>
                        <img src="/logo-white.svg" alt="" />
                    </div>

                    <div>
                        <p>Powered by</p>
                        <img src="/vtex.svg" alt="" />
                    </div>
                </div>
            </div>
        </footer>
    )
}