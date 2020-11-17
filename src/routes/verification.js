const router = require('express').Router();
const authenticated = require('../middlewares/authenticated');

/* Rota que verifica se o token está válido, caso esteja tudo certo retorna true para o frontend */
router.get('/', authenticated, (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(err.message);
        res.status(500).json('Erro no servidor');
    }
});

module.exports = router;