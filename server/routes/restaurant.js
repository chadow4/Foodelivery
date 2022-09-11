const express = require('express');
const router = express.Router();
const restoCtrl = require("../controllers/restaurant");
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get("/", restoCtrl.getAllRestos);

router.get("/:id", restoCtrl.getRestoByUserId);

router.get("/infoResto/:idResto", restoCtrl.getInfoResto);

router.post("/", restoCtrl.createResto);

router.delete("/", restoCtrl.deleteResto);

router.put("/", restoCtrl.updateResto);

module.exports = router;