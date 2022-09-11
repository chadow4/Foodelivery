const express = require('express');
const router = express.Router();
const horaireCtrl = require("../controllers/horaire");
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.put("/disponibilite",horaireCtrl.putDisponibilite);

module.exports = router;