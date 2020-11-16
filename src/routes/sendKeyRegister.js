const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const jsonWebToken = require('../utils/jsonWebToken');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const pool = require('../db');
require("dotenv").config();

const user = process.env.EMAIL;
const pass = process.env.PASS;

/* Rota de cadastro da aplicação, faço uma verificação para o campo de email se está vazio e se é válido, 
e outra verificação para verificar se a senha não está vazia e tem mais que 6 caracteres. */
router.post('/', [body('email').notEmpty().isEmail()],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); 
                
            const { email } = req.body;

            /* Faço uma consulta no banco para verificar se o usuário já existe */  
            const filterUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
            if(filterUser.rows.length > 0) return res.status(401).json('Usuário já cadastrado');
           
            const token = jsonWebToken(email);

            const transporter = nodemailer.createTransport( smtpTransport({
                service: 'Gmail',
                auth: {user, pass }
            }))
        
            transporter.sendMail({
                from: user,
                to: email,
                subject: "Bem vindo a nuvem web !",
                text: ` Para finalizar seu cadastro acesse o link https://localhost:3000/send/key 
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