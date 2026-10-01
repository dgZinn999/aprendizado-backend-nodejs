import Produto from "../models/produto.model";

async function listar() {
    return await Produto.findAll();
}

async function buscarPorId(id: string) {
    return await Produto.findByPk(id);
}

async function criar(dados: { nome: string; preco: number }) {
    if (!dados.nome || dados.preco == null) {
        throw new Error("nome e preco são obrigatórios");
    }

    return await Produto.create({
        nome: dados.nome,
        preco: dados.preco
    });
}

async function atualizar(
    id: string,
    dados: { nome: string; preco: number }
) {
    const produto = await Produto.findByPk(id);

    if (!produto) {
        return null;
    }

    await produto.update({
        nome: dados.nome,
        preco: dados.preco
    });

    return produto;
}

async function excluir(id: string) {
    const produto = await Produto.findByPk(id);

    if (!produto) {
        return false;
    }

    await produto.destroy();

    return true;
}

export {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir
};