const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const jsonWebToken = require('../utils/jsonWebToken');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const pool = require('../db');
require("dotenv").config();

const user = process.env.EMAIL;
const pass = process.env.PASS;

/* Essa rota faz o envio de email para recuperação de senha, realizo uma verificação para o campo de email 
se está vazio e se é válido */
router.post('/', [body('email').notEmpty().isEmail()],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); 
                
            const { email } = req.body;

            /* Verifico se o usuário realmente existe no banco */
            const filterUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
            if(filterUser.rows.length === 0) return res.status(401).json('Usuárionão cadastrado');
           
            /* Faço um token contendo o email do usuário*/
            const token = jsonWebToken(email);

            /* Configuração do nodemailer, com usuário e senha do email */
            const transporter = nodemailer.createTransport( smtpTransport({
                service: 'Gmail',
                auth: {user, pass }
            }))
        
            /* Envio de email para o usuário, enviando a chave para recuperar a senha */
            transporter.sendMail({
                from: user,
                to: email,
                subject: "Bem vindo a nuvem web !",
                text: ` Para finalizar seu cadastro acesse o link http://localhost:3000/send/pass/forgot 
e digite o codigo: ${token}`
            }).then(info =>{
                res.status(200).json(info);
            }).catch(error =>{
                res.status(500).json(error);
            });
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Erro no servidor');
    }
});
module.exports = router;