const db = require("../database/db_config");
const fs = require('fs')
const upload = require('../utils/upload');

exports.getAllPlats = (req, res) => {
  const idResto = req.params.id;

  db.query("SELECT * FROM plat WHERE id_resto = ?", [idResto], (err, result) => {
    if (err) res.json({
      err: "Erreur(s) liée(s) à la base de données.",
      infos: err
    });
    else res.json(result);
  })

}

exports.getAllPlatsByUser = (req, res) => {
  const userId = req.body.id;

  db.query("SELECT plat.id, nom , prix, image  FROM restaurant r JOIN plat on plat.id_resto = r.id WHERE r.id_user = ?", [userId], (err, result) => {
    if (err) res.json({
      err: "Erreur(s) liée(s) à la base de données.",
      infos: err
    });
    else res.json(result);
  })
}

exports.createPlat = (req, res) => {

  if (!req.files || !req.files.photo || Object.keys(req.files).length === 0 || !req.files.photo.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    res.send("Erreur: l'envoie du fichier à échoué.");
    return;
  }

  const file = req.files.photo;
  const file_name = upload.generate_name(file);

  fs.writeFile('./upload/plat/' + file_name, file.data, err => {
    if (err) {
      res.send("Erreur: l'envoie du fichier à échoué.");
    } else {
      const nom = req.body.nomPlat;
      const prix = req.body.prixPlat;
      const id = req.body.id;
      const photoPath = file_name;

      db.query("SELECT id FROM restaurant WHERE id_user = ?", [id],
        (err, result) => {
          if (err) {
            console.log(err);
          }
          if (result) {
            const idResto = result[0].id;
            //console.log(idResto);
            db.query(
              "INSERT INTO plat(nom, prix, image, id_resto) VALUES (?, ?, ?, ?)",
              [nom, prix, photoPath, idResto],
              (err2, result2) => {
                if (err2) {
                  console.log(err2);
                }
                if (result2) {
                  db.query(
                    "UPDATE restaurant SET isPlatCompleted = 1 WHERE id_user = ?",
                    [id],
                    (err3, result3) => {
                      if (err3) {
                        console.log(err3);
                      }
                      if (result3) {
                        console.log("ggwp, plat added to your account !");
                        res.send({
                          msg: 'ggwp, plat added to your restaurant account !'
                        })
                      }
                    });
                }
              });
          }
        }
      )
    };

  });
};

exports.deletePlat = (req, res) => {
  const id = req.body.id;

  db.query(
    "SELECT image FROM plat WHERE id = ?;",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result) {
        if (!result[0]) {
          res.send({err : "Id du plat incorrect"});
          return;
        }

        const imagePath = result[0].image;

        db.query(
          "DELETE FROM plat WHERE id = ?;",
          [id],
          (err1, result1) => {
            if (err1) {
              console.log(err1);
            }
            if (result1) {
              //res.send(result);
              console.log("Plat ID " + id + " supprimé");
              try {
                fs.unlinkSync('./upload/plat/' + imagePath);
                res.send("Plat supprimé")
                //console.log('Image supprimée du serveur');
              } catch (err2) {
                console.error(err2)
              }
            }
          }
        );
      }
    }
  );
}

exports.updatePlat = (req, res) => {

  const nom = req.body.nom;
  const prix = req.body.prix;
  const id = req.body.idPlat;
  const previousImagePath = req.body.previousImagePath;

  if (!req.files || !req.files.photo || Object.keys(req.files).length === 0 || !req.files.photo.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    db.query(
      "UPDATE plat SET nom = ?, prix = ? WHERE id = ?;", [nom, prix, id],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result) {
          res.send("Plat modifié")
        }
      }
    )

    return;
  }

  const file = req.files.photo;
  const file_name = upload.generate_name(file);
  const photoPath = file_name;

  fs.writeFile('./upload/plat/' + file_name, file.data, err => {
    if (err) {
      res.send("Erreur: l'envoie du fichier à échoué.");
    } else {
    db.query(
      "UPDATE plat SET nom = ?, prix = ?, image = ? WHERE id = ?;",
      [nom, prix, photoPath, id],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result) {
          try {
            fs.unlinkSync('./upload/plat/' + previousImagePath);
            res.send("Plat modifié")
            //console.log('Image supprimée du serveur');
          } catch (err2) {
            res.send({err: err2});
          }
        }
      }
    )
  };
  });
}