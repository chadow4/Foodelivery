const db = require("../database/db_config");

  exports.putDisponibilite = (req, res) => {
    const horaire = req.body.horaire;
    const idLivreur = req.body.idLivreur;
    db.query("UPDATE disponibilite_livreur SET disponible =1 where id_livreur= ? and horaire=?;", [idLivreur,horaire], (err, result) => {
        if(err){
          res.send({ err: err })
          console.log(err);
        }
        else{
          res.json(result);
        } 
      })
  
  
  }