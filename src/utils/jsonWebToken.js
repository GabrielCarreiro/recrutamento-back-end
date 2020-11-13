require("dotenv").config();
const jwt = require("jsonwebtoken");


/* Função que recebe o id do usuário e gera um token com expiração de 10 minutos */
function jsonWebToken(id){
    return jwt.sign({id}, process.env.jwt , { expiresIn: '10m' });
};
module.exports = jsonWebToken;