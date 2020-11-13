const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const pool = require('../db');

/* Rota de cadastro da aplicação, faço uma verificação para o campo de email se está vazio e se é válido, 
e outra verificação para verificar se a senha não está vazia e tem mais que 6 caracteres. */
router.post('/',[ 
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isLength({min: 6})],
async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); //
        };

        const { email, password } = req.body;

        /* Faço uma consulta no banco para verificar se o usuário já existe */
        const filterUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if(filterUser.rows.length > 0) return res.status(401).json('Usuário já cadastrado');
        
        /* Se os campos estiver validados e o usuário não estiver cadastrado, uso o bcrypt para 
        criptografar a senha do usuário */
        const saltRounds = 10;
        const newPassword = bcrypt.hashSync(password, saltRounds);

        await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
        [email, newPassword]);
        
        return res.status(201).json('Cadastrado com sucesso')
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Erro no servidor');
    }
});
module.exports = router;