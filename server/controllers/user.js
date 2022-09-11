const db = require("../database/db_config");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const nodemailer = require("nodemailer");
const MAIL_USERNAME = "noreply.foodelivery@gmail.com";
const MAIL_PASSWORD = "Foodelivery69";
const OAUTH_CLIENTID = process.env.OAUTH_CLIENTID;
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const OAUTH_REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN;

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
    clientId: OAUTH_CLIENTID,
    clientSecret: OAUTH_CLIENT_SECRET,
    refreshToken: OAUTH_REFRESH_TOKEN,
  },
});

exports.createUser = (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const mail = req.body.mail;
  const adress = req.body.adress;
  const phone = req.body.phone;
  const password = req.body.password;
  const type = req.body.typeReg;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO user (firstname, lastname, mail, adress, phone, password, TypeInscription) VALUES (?,?,?,?,?,?,?)",
      [firstname, lastname, mail, adress, phone, hash, type],
      (err, result) => {
        if (err) res.send(err);
        else res.send(result);
      }
    );
  });
};

exports.deleteUser = (req, res) => {};

exports.updateUser = (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const id = req.body.id;
  const mail = req.body.mail;
  const phone = req.body.phone;

  db.query(
    "UPDATE user SET  firstname= ?, lastname = ?, mail=?, phone=? WHERE id = ?;",
    [firstname, lastname, mail, phone, id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result) {
        res.send("Utilisateur modifié");
      }
    }
  );

  return;
};

exports.updateUserPassword = (req, res) => {
  const id = req.body.id;
  const password = req.body.passwordModif;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "UPDATE user SET  password= ? WHERE id = ?;",
      [hash, id],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result) {
          res.send("Utilisateur modifié");
        }
      }
    );
  });

  return;
};

exports.login = (req, res) => {
  const mail = req.body.mail;
  const password = req.body.password;

  db.query(
    // checking par mail + mot de passe
    "SELECT * FROM user WHERE mail = ?",
    [mail],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            res.send(result); // envoi de toute la ligne SQL SELECT
          } else {
            res.send({ message: "Le mot de passe saisi est incorrect" });
          }
        });
      } else {
        res.send({ message: "L'utilisateur saisi n'existe pas" });
      }
    }
  );
};

exports.updateMesHoraires = (req, res) => {
  const idLivreur = req.body.id;
  const horaire = req.body.horaire;

  db.query(
    "UPDATE disponibilite_livreur SET disponible = NOT disponible WHERE id_livreur = ? AND horaire = ?;",
    [idLivreur, horaire],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result) {
        res.send("Disponibilité modifiée !");
      }
    }
  );

  return;
};

exports.getDispo = (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM disponibilite_livreur WHERE id_livreur = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result) {
        res.send(result);
      }
    }
  );
  return;
};

exports.getInfoUser = (req, res) => {
  const id = req.params.idUser;

  db.query("SELECT * FROM user WHERE id= ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result) {
      res.send(result);
    }
  });
};

exports.envoyerMail = (req, res) => {
  let mailOptions = {
    from: "noreply.foodelivery@gmail.com",
    to: req.body.mail,
    subject: "Confirmation de votre commande",
    text: "Bonjour, votre commande a été validée et est en cours de préparation. Merci de la part de Foodelivery",
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error : " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
};
