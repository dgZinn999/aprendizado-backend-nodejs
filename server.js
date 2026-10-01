const http = require("http");

const server = http.createServer((req, res) => {

    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    if (req.url === "/") {
        res.end("Página inicial");
    }

    if (req.url === "/produtos") {
        res.end("Lista de produtos");
    }

    if (req.url === "/sobre") {
        res.end("Página sobre nós");
    }

});

server.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});