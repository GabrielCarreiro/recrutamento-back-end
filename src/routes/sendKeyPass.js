const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const jsonWebToken = require('../utils/jsonWebToken');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
require("dotenv").config();

const user = process.env.EMAIL;
const pass = process.env.PASS;

router.post('/', [body('email').notEmpty().isEmail()],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); 
                
            const { email } = req.body;

            const token = jsonWebToken(email);

            const transporter = nodemailer.createTransport( smtpTransport({
                service: 'Gmail',
                auth: {user, pass }
            }))
        
            transporter.sendMail({
                from: user,
                to: email,
                subject: "Bem vindo a nuvem web !",
                text: ` Para finalizar seu cadastro acesse o link https://localhost:3000/send/key/forgot 
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