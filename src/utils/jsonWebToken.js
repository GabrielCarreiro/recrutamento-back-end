require("dotenv").config();
const jwt = require("jsonwebtoken");

/* Função que recebe um dado passado por parametro e gera um token com expiração de 10 minutos, 
salvando nas variáveis de ambiente */
function jsonWebToken(id){
    return jwt.sign({id}, process.env.JWT, { expiresIn: '10m' });
};
module.exports = jsonWebToken;