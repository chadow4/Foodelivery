const express = require('express');
const router = express.Router();
const commandeCtrl = require("../controllers/commande");
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get("/:idResto", commandeCtrl.getCommande); // pour le restaurateur

router.get("/livreur/:idLivreur",commandeCtrl.getListeCommandeDispo); //Pour le livreur

router.get("/commandeSelectionnee/:idLivreur",commandeCtrl.getListeCommandeSelectionnee); //Pour le livreur commande en cours

router.get("/liste/:idCommande",commandeCtrl.getListeProduitCommande);

router.get("/infosCommandes/:idClient",commandeCtrl.getInfosCommandes); // Pour le Client

router.post("/", commandeCtrl.creerCommande);

router.post("/insererpanier", commandeCtrl.insererPanierCommande);

router.put("/etatPreparation", commandeCtrl.modifierEtatPreparation);

router.put("/etatAffectation", commandeCtrl.modifierEtatAffectation);

router.put("/etatLivraison", commandeCtrl.modifierEtatLivraison);


module.exports = router;
