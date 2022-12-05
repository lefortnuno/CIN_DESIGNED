let dbConn = require("../config/db");

let Utilisateur = function (utilisateur) {
  this.id = utilisateur.id;
  this.image = utilisateur.image;
};

Utilisateur.addUtilisateur = (newUtilisateur, result) => {
    console.log("newUtilisateur: ", newUtilisateur);
  dbConn.query("INSERT INTO users SET ?", newUtilisateur, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, { success: true, message: "Ajout reussi !" });
    }
  });
};

Utilisateur.getAllUtilisateurs = (result) => {
  dbConn.query("SELECT * FROM users order by id desc", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};


module.exports = Utilisateur;
