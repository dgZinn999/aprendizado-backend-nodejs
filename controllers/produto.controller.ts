import { Request, Response } from "express";
import * as service from "../services/produto.service";

async function listar(req: Request, res: Response) {
    const produtos = await service.listar();

    res.status(200).json(produtos);
}

async function buscarPorId(req: Request, res: Response) {
    const produto = await service.buscarPorId(
        String(req.params.id)
    );

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    res.status(200).json(produto);
}

async function criar(req: Request, res: Response) {
    try {
        const produto = await service.criar(req.body);

        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({
            mensagem: (error as Error).message
        });
    }
}

async function atualizar(req: Request, res: Response) {
    const produto = await service.atualizar(
        String(req.params.id),
        req.body
    );

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    res.status(200).json(produto);
}

async function excluir(req: Request, res: Response) {
    const excluido = await service.excluir(
        String(req.params.id)
    );

    if (!excluido) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    res.status(204).send();
}

export {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir
};