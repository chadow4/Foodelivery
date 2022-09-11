const db = require("../database/db_config");
const fs = require('fs')
const upload = require('../utils/upload');

exports.getAllRestos = (req, res) => {
    db.query("SELECT * FROM restaurant", (err, result) => {
        if (err) res.json({
            err: "Erreur(s) liée(s) à la base de données.",
            infos: err
        });
        else res.json(result);
    })
}

exports.getRestoByUserId = (req, res) => {
    const userID = req.params.id;
  
    db.query(
      "SELECT * FROM restaurant WHERE id_user = ?",
      [userID],
      (err, result) => {
        if(err){
          console.log(err);
        }
        if(result){
          res.send(result);
        }
      }
    );
}

exports.getInfoResto = (req, res) => {
  const idResto = req.params.idResto;
  db.query(
    "SELECT * FROM restaurant WHERE id = ?",
    [idResto],
    (err, result) => {
      if(err){
        console.log(err);
      }
      if(result){
        res.send(result);
      }
    }
  );
}


exports.createResto = (req, res) => {

  if (!req.files || !req.files.photo || Object.keys(req.files).length === 0 || !req.files.photo.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    res.send("Erreur: l'envoie du fichier à échoué.");
    return;
  }

  const file = req.files.photo;
  const file_name = upload.generate_name(file);

  fs.writeFile('./upload/restaurant/' + file_name, file.data, err => {
    if (err) { 
      res.send("Erreur: l'envoie du fichier à échoué.");
    } else {
      const name = req.body.name;
      const address = req.body.address;
      const description = req.body.description;
      const imagePath = file_name;
      const userID = req.body.sessionID;
      const debutMatin = req.body.debutMatin;
      const finMatin = req.body.finMatin;
      const debutSoir = req.body.debutSoir;
      const finSoir = req.body.finSoir;
  
      db.query(
        "INSERT INTO restaurant(name, address, description, image_resto, id_user, debutMatin, finMatin, debutSoir, finSoir) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [name, address, description, imagePath, userID, debutMatin, finMatin, debutSoir, finSoir], (err, result) => {
          if(err){
            res.send({ err: err })
          }
          if(result){
            db.query(
              "UPDATE user SET isRestaurantCompleted = 1 WHERE id = ?", [userID], (err, result2) => {
                if(err){
                  res.send(err);
                }
                if(result2){
                  res.send("Restaurant créé");
                }
            });
          }
        }
      );
    }
  })

};

exports.deleteResto = (req, res) => {

}

exports.updateResto = (req, res) => {

}