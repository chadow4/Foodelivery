const db = require("../database/db_config");


exports.getCommande = (req, res) => {
  const idResto = req.params.idResto;
  db.query("SELECT * FROM commande WHERE id_resto = ? and etat_preparation = 0 ;", [idResto], (err, result) => {
    if (err) res.json({
      err: "Erreur(s) liée(s) à la base de données.",
      infos: err
    });
    else res.json(result);
  })
}

exports.getListeCommandeDispo = (req, res) => {
  const idLivreur = req.params.idLivreur;
  db.query("SELECT id_commande, id_client, C.harrondi as horaire, id_resto, C.date FROM commande as C, disponibilite_livreur as D WHERE C.harrondi = D.horaire and etat_preparation = 1 and C.id_livreur = 0 and D.disponible = 1 and D.id_livreur = ? and C.harrondi in (select horaire from disponibilite_livreur where id_livreur = ? and disponible = 1);",
  [idLivreur,idLivreur], 
  (err, result) => {
    if (err) res.json({
      err: "Erreur(s) liée(s) à la base de données.",
      infos: err
    });
    else res.json(result);
  })
}

exports.getListeCommandeSelectionnee = (req, res) => {
  const idLivreur = req.params.idLivreur;
  db.query("SELECT id_commande, id_client, commande.harrondi, id_resto, date  FROM commande, disponibilite_livreur WHERE etat_livraison=0 and commande.harrondi = disponibilite_livreur.horaire and etat_preparation = 1 and commande.id_livreur = ? and disponibilite_livreur.disponible=1 and disponibilite_livreur.id_livreur=? and commande.harrondi in (select horaire from disponibilite_livreur where id_livreur=? and disponible=1 );", [idLivreur,idLivreur,idLivreur], (err, result) => {
    if (err) res.json({
      err: "Erreur(s) liée(s) à la base de données.",
      infos: err
    });
    else res.json(result);
  })
}

exports.getListeProduitCommande = (req, res) => {
  const idCommande = req.params.idCommande;
  db.query("SELECT id_commande, nom, prix , nb_plat FROM produitcommande p join plat on p.id_plat = plat.id WHERE id_commande = ? ;", [idCommande], (err, result) => {
    if (err) res.json({
      err: "Erreur(s) liée(s) à la base de données.",
      infos: err
    });
    else {
      res.json(result);
    }
  })
}

exports.getInfosCommandes = (req, res) => {
  const idClient = req.params.idClient;
  console.log(idClient);
  db.query("SELECT * FROM commande where id_client=?", [idClient], (err, result) => {
    if (err) res.json({
      err: "Erreur(s) liée(s) à la base de données.",
      infos: err
    });
    else {
      res.json(result);
    }
  })
}

exports.creerCommande = (req, res) => {
  const idUser = req.body.idClient;
  const idResto = req.body.idResto ;
  const dateCommande = req.body.dateC;
  const horaireCommande = req.body.horaire;
  const horairearrondi= req.body.harrondi;
  const adresselivraison= req.body.adresseLivraison;

  db.query("INSERT INTO commande(id_client,id_resto,date, horaire, harrondi, adresse_livraison) VALUES (?,?,?,?,?, ?);", [idUser,idResto,dateCommande, horaireCommande, horairearrondi, adresselivraison], (err, result) => {
    if(err){
      res.send({ err: err })
      console.log(err);
    }
    else{
      res.json(result);
    } 
  })
}

exports.insererPanierCommande = (req, res) => {
  const idCommande = req.body.idCommande;
  const idPlat = req.body.idPlat;
  const nbPlat= req.body.nbPlat ;

  db.query("INSERT INTO produitcommande(id_commande,id_plat,nb_plat) VALUES (?,?,?);", [idCommande,idPlat,nbPlat], (err, result) => {
    if(err){
      res.send({ err: err })
      console.log(err);
    }
    else{
      res.json(result);
    } 
  })
}

exports.modifierEtatPreparation = (req, res) => {
  const idCommande = req.body.idCommande;
  db.query("UPDATE commande SET etat_preparation = 1  WHERE id_commande = ?;", [idCommande], (err, result) => {
    if(err){
      res.send({ err: err })
      console.log(err);
    }
    else{
      res.json(result);
    } 
  })  


}

exports.modifierEtatAffectation = (req, res) => {
  const idCommande = req.body.idCommande;
  const horaire = req.body.horaire;
  const idLivreur = req.body.idLivreur;
  db.query("UPDATE commande SET id_livreur= ?  WHERE id_commande = ?;", [idLivreur,idCommande], (err, result) => {
    if(err){
      res.send({ err: err })
      console.log(err);
    }
    else{
      res.json(result);
    } 
  })

}

exports.modifierEtatLivraison = (req, res) => {
  const idCommande = req.body.idCommande;
  console.log(idCommande);
  db.query("UPDATE commande SET etat_livraison=1  WHERE id_commande = ?;", [idCommande], (err, result) => {
    if(err){
      res.send({ err: err })
      console.log(err);
    }
    else{
      res.json(result);
    } 
  })

}