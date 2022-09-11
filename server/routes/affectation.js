const express = require('express');
const router = express.Router();
const affectationCtrl= require("../controllers/affectation");
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post("/", affectationCtrl.creerAffectation); 

module.exports = router;
