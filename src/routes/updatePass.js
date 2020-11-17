const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const pool = require('../db');
const jwt = require("jsonwebtoken");

/* Rotas de recuperação de senha, realizo uma validação no campo de senha e chave */
router.post('/',
    [body('password').notEmpty().isLength({min: 6}),
     body('token').notEmpty()],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() }); 
            };
    
            const { password, token } = req.body;

             /* Realiza a verificação do token enviado com o salvo na variável de ambiente */
            jwt.verify(token, process.env.JWT);

              /* Realizo a decodificação do token para obter o email */
            let email = jwt.decode(token);
     
            /* Uso o bcrypt para criptografar a senha do usuário */
            const saltRounds = 10;
            const newPassword = bcrypt.hashSync(password, saltRounds);
    
            /* Faço a atualização da senha do usuário de acordo o email */
            await pool.query('UPDATE users SET password = $2 WHERE email = $1 RETURNING *',
            [email.id, newPassword]);
            
            return res.status(200).json('Senha atualizada com sucesso.')
        } catch (err) {
            console.error(err.message);
            res.status(500).json('Erro no servidor');
        }
    });
    module.exports = router;