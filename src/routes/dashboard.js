const router = require('express').Router();
const authenticated = require('../middlewares/authenticated');
const fetch = require("node-fetch");
require("dotenv").config();

router.post('/', authenticated , async (req, res) => {
    try {
        const response = await fetch('https://recrutamento.alterdata.cloud/listaServidor',
            {
                method: 'GET',
                headers: {
                Authorization:'Bearer ' + process.env.API_KEY_SERVERS,
                },
            }   
        );

        const listServers = await response.json();
        return res.status(200).json({listServers});
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Erro no servidor');
    }
});
module.exports = router;