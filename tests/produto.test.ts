import request from "supertest";
import app from "../app";
import sequelize from "../config/database";
import Produto from "../models/produto.model";

describe("API de Produtos", () => {
    let produtoId: number;

    const nomeProduto = `Produto Teste ${Date.now()}`;

    beforeAll(async () => {
        await sequelize.authenticate();
        await sequelize.sync();
    });

    afterAll(async () => {
        if (produtoId) {
            await Produto.destroy({
                where: { id: produtoId }
            });
        }

        await sequelize.close();
    });

    test("deve criar um produto", async () => {
        const response = await request(app)
            .post("/produtos")
            .send({
                nome: nomeProduto,
                preco: 100
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.nome).toBe(nomeProduto);

        produtoId = response.body.id;
    });

    test("deve retornar erro ao criar produto sem dados obrigatórios", async () => {
        const response = await request(app)
            .post("/produtos")
            .send({
                nome: ""
            });

        expect(response.status).toBe(400);
    });

    test("deve listar os produtos", async () => {
        const response = await request(app)
            .get("/produtos");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("deve buscar um produto pelo ID", async () => {
        const response = await request(app)
            .get(`/produtos/${produtoId}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(produtoId);
    });

    test("deve retornar 404 para produto inexistente", async () => {
        const response = await request(app)
            .get("/produtos/999999999");

        expect(response.status).toBe(404);
    });

    test("deve atualizar um produto", async () => {
        const response = await request(app)
            .put(`/produtos/${produtoId}`)
            .send({
                nome: `${nomeProduto} Atualizado`,
                preco: 150
            });

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe(`${nomeProduto} Atualizado`);
    });

    test("deve retornar 404 ao atualizar produto inexistente", async () => {
        const response = await request(app)
            .put("/produtos/999999999")
            .send({
                nome: "Produto Inexistente",
                preco: 50
            });

        expect(response.status).toBe(404);
    });

    test("deve excluir um produto", async () => {
        const response = await request(app)
            .delete(`/produtos/${produtoId}`);

        expect(response.status).toBe(204);

        produtoId = 0;
    });

    test("deve retornar 404 ao excluir produto inexistente", async () => {
        const response = await request(app)
            .delete("/produtos/999999999");

        expect(response.status).toBe(404);
    });
});