const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const jsonWebToken = require('../utils/jsonWebToken');
const bcrypt = require('bcrypt');
const pool = require('../db');

/* Rota de login da aplicação, verificamos se o campo email está vazio é depois se é válido, 
e acontece a mesma coisa com a senha no entanto verificando que esse campo precisa ter mais que 
6 caracteres. Após a validação faço uma consulta no banco buscando se o email que o usuário 
inseriu existe no banco, caso o email exista a constante filterUser recebe o resultado da consulta.
Se a consulta não retornar nada, devolvo para o front informando que o email ou senha são inválidos. */
router.post('/',[
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isLength({min: 6})
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json('Invalid value'); //{ errors: errors.array() }
        }
        const { email, password } = req.body;
        const filterUser = await pool.query(`SELECT * FROM users WHERE email = $1` , [email]);

        if(filterUser.rows.length === 0) return res.status(401).send('Email ou Senha inválido');

        const validatePassword = await bcrypt.compare(password, filterUser.rows[0].password);
        if(!validatePassword) return res.status(401).send('Email ou Senha inválido');

        const token = jsonWebToken(filterUser.rows[0].id);
        return res.json({token});
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Erro no servidor');
    }
});
module.exports = router;
