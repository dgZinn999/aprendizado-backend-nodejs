const service = require("../services/produto.service");

function listar(req, res) {
    const produtos = service.listar();

    res.status(200).json(produtos);
}

function buscarPorId(req, res) {
    const produto = service.buscarPorId(req.params.id);

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    res.status(200).json(produto);
}

function criar(req, res) {
    try {
        const produto = service.criar(req.body);

        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        });
    }
}

module.exports = {
    listar,
    buscarPorId,
    criar
};