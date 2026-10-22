
import { useEffect, useReducer } from "react";
import { CarrinhoContext } from "./CarrinhoContext";

const CHAVE_CARRINHO = "sabor-e-cia-carrinho";

function carregarCarrinho() {
    try {
        const salvo = localStorage.getItem(CHAVE_CARRINHO);

        if (!salvo) return [];

        const itens = JSON.parse(salvo);

        if (!Array.isArray(itens)) return [];

        return itens.filter((item) =>
            item &&
            typeof item.nome === "string" &&
            Number.isFinite(item.preco) &&
            item.preco >= 0 &&
            Number.isInteger(item.quantidade) &&
            item.quantidade > 0
        );
    } catch {
        return [];
    }
}

function carrinhoReducer(itens, acao) {
    switch (acao.tipo) {
        case "adicionar": {
            const produto = acao.produto;
            const jaExiste = itens.some(
                (item) => item.id === produto.id
            );

            if (jaExiste) {
                return itens.map((item) =>
                    item.id === produto.id
                        ? { ...item, quantidade: item.quantidade + 1 }
                        : item
                );
            }

            return [
                ...itens,
                {
                    id: produto.id,
                    nome: produto.nome,
                    preco: produto.preco,
                    quantidade: 1,
                },
            ];
        }

        case "aumentar":
            return itens.map((item) =>
                item.id === acao.id
                    ? { ...item, quantidade: item.quantidade + 1 }
                    : item
            );

        case "diminuir":
            return itens
                .map((item) =>
                    item.id === acao.id
                        ? { ...item, quantidade: item.quantidade - 1 }
                        : item
                )
                .filter((item) => item.quantidade > 0);

        case "remover":
            return itens.filter((item) => item.id !== acao.id);

        case "limpar":
            return [];

        default:
            return itens;
    }
}

function CarrinhoProvider({ children }) {
    const [itens, dispatch] = useReducer(
        carrinhoReducer,
        undefined,
        carregarCarrinho
    );

    useEffect(() => {
        try {
            localStorage.setItem(
                CHAVE_CARRINHO,
                JSON.stringify(itens)
            );
        } catch (erro) {
            console.error("Não foi possível salvar o carrinho:", erro);
        }
    }, [itens]);

    const quantidade = itens.reduce(
        (acumulado, item) => acumulado + item.quantidade,
        0
    );

    const total = itens.reduce(
        (acumulado, item) => acumulado + item.preco * item.quantidade,
        0
    );

    const value = {
        itens,
        quantidade,
        total,
        adicionar: (produto) =>
            dispatch({ tipo: "adicionar", produto }),
        aumentar: (id) =>
            dispatch({ tipo: "aumentar", id }),
        diminuir: (id) =>
            dispatch({ tipo: "diminuir", id }),
        remover: (id) =>
            dispatch({ tipo: "remover", id }),
        limpar: () =>
            dispatch({ tipo: "limpar" }),
    };

    return (
        <CarrinhoContext.Provider value={value}>
            {children}
        </CarrinhoContext.Provider>
    );
}

export { CarrinhoProvider };
