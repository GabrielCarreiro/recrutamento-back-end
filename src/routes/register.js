const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const pool = require('../db');
const jwt = require("jsonwebtoken");

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

            jwt.verify(key, process.env.JWT);

            let email = jwt.decode(key);
     
            /* Se os campos estiver validados e o usuário não estiver cadastrado, uso o bcrypt para 
            criptografar a senha do usuário */
            const saltRounds = 10;
            const newPassword = bcrypt.hashSync(password, saltRounds);
    
            await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email.id, newPassword]);
            
            return res.status(201).json('Cadastrado com sucesso')
        } catch (err) {
            console.error(err.message);
            res.status(500).json('Erro no servidor');
        }
    });
    module.exports = router;