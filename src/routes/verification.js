const router = require('express').Router();
const authenticated = require('../middlewares/authenticated');

router.get('/', authenticated, (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(err.message);
        res.status(500).json('Erro no servidor');
    }
});

module.exports = router;