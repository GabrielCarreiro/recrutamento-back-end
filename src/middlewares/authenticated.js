require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        // Recebe o token passado no header da requisição
        const token = req.headers.token;

        //Verifica se o token existe
        if (!token) return res.status(403).json('Não autorizado');

        /* Jwt faz a verificação do token recebido para verificar se é igual, caso esteja tudo certo chama
        a função next autorizando prosseguir*/
        jwt.verify(token, process.env.JWT);

        next();

    } catch (err) {
        console.error(err.message);
        return res.status(403).json('Não autorizado');
    };
};
