const router = require('express').Router();
const authenticated = require('../middlewares/authenticated');

router.get('/', authenticated , async (req, res) => {
    try {
        const loginApi = await fetch('')
        return res.status(201).json('Cadastrado com sucesso')
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Erro no servidor');
    }
});
module.exports = router;