const db = require("../database/db_config");

exports.creerAffectation = (req, res) => {
    const idCommande = req.body.idCommande;
    const idLivreur = req.body.idLivreur;
    const horaire= req.body.horaire ;
    const date= req.body.date;
  
    db.query("INSERT INTO affectation_livraison(id_commande,id_livreur, horaire,date) VALUES (?,?,?,?);", [idCommande,idLivreur,horaire,date], (err, result) => {
      if(err){
        res.send({ err: err })
        console.log(err);
      }
      else{
        res.json(result);
      } 
    })
  }