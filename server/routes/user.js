const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/user");
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post("/", userCtrl.createUser);

router.delete("/", userCtrl.deleteUser);

router.put("/", userCtrl.updateUser);

router.put("/modifmdp", userCtrl.updateUserPassword);

router.post("/login", userCtrl.login);

router.put("/mes-horaires", userCtrl.updateMesHoraires);

router.get("/getdispo/:id", userCtrl.getDispo);

router.get("/:idUser", userCtrl.getInfoUser);

router.post("/node-mailer", userCtrl.envoyerMail);

module.exports = router;