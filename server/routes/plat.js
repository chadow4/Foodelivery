const express = require('express');
const router = express.Router();
const platCtrl = require("../controllers/plat");
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get("/:id", platCtrl.getAllPlats); 

router.post("/user", platCtrl.getAllPlatsByUser);

router.post("/", platCtrl.createPlat);

router.delete("/", platCtrl.deletePlat);

router.put("/", platCtrl.updatePlat);

module.exports = router;