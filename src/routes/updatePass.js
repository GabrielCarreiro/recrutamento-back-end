const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const pool = require('../db');
const jwt = require("jsonwebtoken");

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

            jwt.verify(token, process.env.JWT);

            let email = jwt.decode(token);
     
            const saltRounds = 10;
            const newPassword = bcrypt.hashSync(password, saltRounds);
    
            await pool.query('UPDATE users SET password = $2 WHERE email = $1 RETURNING *',
            [email.id, newPassword]);
            
            return res.status(200).json('Senha atualizada com sucesso.')
        } catch (err) {
            console.error(err.message);
            res.status(500).json('Erro no servidor');
        }
    });
    module.exports = router;