const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const pool = require('../db');
const jwt = require("jsonwebtoken");

/* Rotas que cadastra o novo usuário no banco de dados */
router.post('/',
    [body('password').notEmpty().isLength({min: 6}),
     body('key').notEmpty()],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() }); 
            };
    
            const { password, key } = req.body;
            
            /* Realiza a verificação do token enviado com o salvo na variável de ambiente */
            jwt.verify(key, process.env.JWT);

            /* Realizo a decodificação do token para obter o email */
            let email = jwt.decode(key);
     
            /* Se os campos estiver validados, uso o bcrypt para criptografar a senha do usuário */
            const saltRounds = 10;
            const newPassword = bcrypt.hashSync(password, saltRounds);
    
            /* Executo a query no banco de dados inserindo o nome usuário*/
            await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email.id, newPassword]);
            
            return res.status(201).json('Cadastrado com sucesso')
        } catch (err) {
            console.error(err.message);
            res.status(500).json('Erro no servidor');
        }
    });
    module.exports = router;