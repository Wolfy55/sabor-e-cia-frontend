
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Cardapio } from '../components/Cardapio'
import { BarraPedido } from '../components/BarraPedido'
import { Modal } from '../components/Modal'
import { Button } from '../components/Button'
import { useCarrinho } from '../context/useCarrinho'
import { formatarPreco } from '../utils/formatarPreco'

import styles from '../styles/pages/CardapioPage.module.css'

const pagamentoSchema = z.object({
    nome: z.string()
        .trim()
        .min(2, 'Informe seu nome completo.'),

    telefone: z.string()
        .refine((valor) => {
            const digitos = valor.replace(/\D/g, '')
            return digitos.length === 10 || digitos.length === 11
        }, 'Informe um WhatsApp com DDD válido.'),

    entrega: z.enum(['mesa', 'balcao']),

    mesa: z.string(),

    pagamento: z.enum(['pix', 'cartao', 'dinheiro']),

    troco: z.string(),

    obs: z.string(),
}).superRefine((dados, contexto) => {
    if (dados.entrega === 'mesa' && !/^\d+$/.test(dados.mesa.trim())) {
        contexto.addIssue({
            code: 'custom',
            path: ['mesa'],
            message: 'Informe o número da mesa.',
        })
    }

    if (dados.entrega === 'mesa' && Number(dados.mesa) < 1) {
        contexto.addIssue({
            code: 'custom',
            path: ['mesa'],
            message: 'O número da mesa deve ser maior que zero.',
        })
    }

    if (dados.pagamento === 'dinheiro' && dados.troco.trim()) {
        const troco = Number(
            dados.troco.replace(',', '.')
        )

        if (!Number.isFinite(troco) || troco <= 0) {
            contexto.addIssue({
                code: 'custom',
                path: ['troco'],
                message: 'Informe um valor de troco válido.',
            })
        }
    }
})

const valoresIniciais = {
    nome: '',
    telefone: '',
    entrega: 'mesa',
    mesa: '',
    pagamento: 'pix',
    troco: '',
    obs: '',
}

function CardapioPage() {
    const [painelAberto, setPainelAberto] = useState(null)
    const [mensagem, setMensagem] = useState('')

    const {
        itens,
        quantidade,
        total,
        aumentar,
        diminuir,
        remover,
        limpar,
    } = useCarrinho()

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(pagamentoSchema),
        defaultValues: valoresIniciais,
    })

    const entrega = watch('entrega')
    const pagamento = watch('pagamento')

    const fecharPainel = useCallback(() => {
        setPainelAberto(null)
        setMensagem('')
    }, [])

    const abrirCarrinho = useCallback(() => {
        setMensagem('')
        setPainelAberto('carrinho')
    }, [])

    const abrirPagamento = useCallback(() => {
        if (itens.length === 0) return

        setMensagem('')
        setPainelAberto('pagamento')
    }, [itens.length])

    const voltarCarrinho = useCallback(() => {
        setMensagem('')
        setPainelAberto('carrinho')
    }, [])

    function limparCarrinho() {
        limpar()
        reset(valoresIniciais)
        fecharPainel()
    }

    function confirmarPedido(dados) {
        if (itens.length === 0) {
            setMensagem('Seu carrinho está vazio.')
            return
        }

        if (dados.pagamento === 'dinheiro' && dados.troco.trim()) {
            const valorTroco = Number(
                dados.troco.replace(',', '.')
            )

            if (!Number.isFinite(valorTroco) || valorTroco < total) {
                setMensagem(
                    'O valor informado para o troco deve ser igual ou superior ao total do pedido.'
                )
                return
            }
        }

        const pedido = {
            cliente: {
                nome: dados.nome.trim(),
                telefone: dados.telefone.replace(/\D/g, ''),
            },
            entrega: dados.entrega,
            mesa: dados.entrega === 'mesa'
                ? dados.mesa.trim()
                : null,
            pagamento: dados.pagamento,
            troco: dados.pagamento === 'dinheiro'
                ? dados.troco.trim()
                : null,
            observacoes: dados.obs.trim(),
            itens: itens.map((item) => ({
                id: item.id,
                nome: item.nome,
                preco: item.preco,
                quantidade: item.quantidade,
            })),
            total,
        }

        console.log('Pedido validado:', pedido)

        setMensagem(
            'Dados validados! O pedido ainda não foi enviado à cozinha. A integração de envio precisa ser configurada.'
        )
    }

    return (
        <>
            <Cardapio />

            <BarraPedido onAbrir={abrirCarrinho} />

            <Modal
                open={painelAberto !== null}
                onClose={fecharPainel}
                title={
                    painelAberto === 'carrinho'
                        ? 'Seu carrinho'
                        : 'Finalizar pedido'
                }
            >
                {painelAberto === 'carrinho' && (
                    <div className={styles.painel}>
                        {itens.length === 0 ? (
                            <p className={styles.mensagem}>
                                Seu carrinho está vazio.
                            </p>
                        ) : (
                            <>
                                <ul className={styles.lista}>
                                    {itens.map((item) => (
                                        <li
                                            key={item.id}
                                            className={styles.item}
                                        >
                                            <div className={styles.itemInfo}>
                                                <strong>{item.nome}</strong>

                                                <span>
                                                    {formatarPreco(item.preco)}
                                                    {' '}cada
                                                </span>

                                                <strong>
                                                    {formatarPreco(
                                                        item.preco * item.quantidade
                                                    )}
                                                </strong>
                                            </div>

                                            <div className={styles.acoesItem}>
                                                <button
                                                    type="button"
                                                    onClick={() => diminuir(item.id)}
                                                    aria-label={`Diminuir quantidade de ${item.nome}`}
                                                >
                                                    −
                                                </button>

                                                <span>{item.quantidade}</span>

                                                <button
                                                    type="button"
                                                    onClick={() => aumentar(item.id)}
                                                    aria-label={`Aumentar quantidade de ${item.nome}`}
                                                >
                                                    +
                                                </button>

                                                <button
                                                    type="button"
                                                    className={styles.remover}
                                                    onClick={() => remover(item.id)}
                                                >
                                                    Remover
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <div className={styles.total}>
                                    <span>
                                        Total ({quantidade}{' '}
                                        {quantidade === 1 ? 'item' : 'itens'})
                                    </span>

                                    <strong>{formatarPreco(total)}</strong>
                                </div>

                                <div className={styles.acoes}>
                                    <Button
                                        type="button"
                                        onClick={abrirPagamento}
                                    >
                                        Continuar
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={limparCarrinho}
                                    >
                                        Limpar carrinho
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {painelAberto === 'pagamento' && (
                    <form
                        className={styles.formulario}
                        onSubmit={handleSubmit(confirmarPedido)}
                        noValidate
                    >
                        <div className={styles.resumo}>
                            <h3>Resumo do pedido</h3>

                            <ul className={styles.resumoLista}>
                                {itens.map((item) => (
                                    <li key={item.id}>
                                        <span>
                                            {item.quantidade}x {item.nome}
                                        </span>

                                        <span>
                                            {formatarPreco(
                                                item.preco * item.quantidade
                                            )}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <div className={styles.total}>
                                <strong>Total</strong>
                                <strong>{formatarPreco(total)}</strong>
                            </div>
                        </div>

                        <div className={styles.campo}>
                            <label htmlFor="nome">Seu nome</label>

                            <input
                                id="nome"
                                autoComplete="name"
                                {...register('nome')}
                            />

                            {errors.nome && (
                                <span className={styles.erro} role="alert">
                                    {errors.nome.message}
                                </span>
                            )}
                        </div>

                        <div className={styles.campo}>
                            <label htmlFor="telefone">WhatsApp com DDD</label>

                            <input
                                id="telefone"
                                type="tel"
                                inputMode="tel"
                                autoComplete="tel"
                                placeholder="(35) 90000-0000"
                                {...register('telefone')}
                            />

                            {errors.telefone && (
                                <span className={styles.erro} role="alert">
                                    {errors.telefone.message}
                                </span>
                            )}
                        </div>

                        <fieldset className={styles.grupo}>
                            <legend>Como você quer receber?</legend>

                            <label>
                                <input
                                    type="radio"
                                    value="mesa"
                                    {...register('entrega')}
                                />
                                Consumir na mesa
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="balcao"
                                    {...register('entrega')}
                                />
                                Retirar no balcão
                            </label>
                        </fieldset>

                        {entrega === 'mesa' && (
                            <div className={styles.campo}>
                                <label htmlFor="mesa">Número da mesa</label>

                                <input
                                    id="mesa"
                                    inputMode="numeric"
                                    {...register('mesa')}
                                />

                                {errors.mesa && (
                                    <span className={styles.erro} role="alert">
                                        {errors.mesa.message}
                                    </span>
                                )}
                            </div>
                        )}

                        <fieldset className={styles.grupo}>
                            <legend>Forma de pagamento</legend>

                            <label>
                                <input
                                    type="radio"
                                    value="pix"
                                    {...register('pagamento')}
                                />
                                Pix
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="cartao"
                                    {...register('pagamento')}
                                />
                                Cartão
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="dinheiro"
                                    {...register('pagamento')}
                                />
                                Dinheiro
                            </label>
                        </fieldset>

                        {pagamento === 'dinheiro' && (
                            <div className={styles.campo}>
                                <label htmlFor="troco">
                                    Troco para quanto? (opcional)
                                </label>

                                <input
                                    id="troco"
                                    inputMode="decimal"
                                    placeholder="Ex.: 50,00"
                                    {...register('troco')}
                                />

                                {errors.troco && (
                                    <span className={styles.erro} role="alert">
                                        {errors.troco.message}
                                    </span>
                                )}
                            </div>
                        )}

                        <div className={styles.campo}>
                            <label htmlFor="obs">
                                Observações (opcional)
                            </label>

                            <textarea
                                id="obs"
                                rows={3}
                                placeholder="Ex.: sem açúcar"
                                {...register('obs')}
                            />
                        </div>

                        {mensagem && (
                            <p className={styles.mensagem} role="status">
                                {mensagem}
                            </p>
                        )}

                        <div className={styles.acoes}>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Confirmar pedido
                            </Button>

                            <Button
                                type="button"
                                variant="ghost"
                                onClick={voltarCarrinho}
                            >
                                Voltar ao carrinho
                            </Button>
                        </div>
                    </form>
                )}
            </Modal>
        </>
    )
}

export { CardapioPage }
