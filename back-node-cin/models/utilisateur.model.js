let dbConn = require("../config/bdd");

let Utilisateur = function (utilisateur) {
  this.idUtilisateur = utilisateur.idUtilisateur;
  this.identification = utilisateur.identification;
  this.attribut = utilisateur.attribut;
  this.mdp = utilisateur.mdp;
  this.etatUtilisateur = utilisateur.etatUtilisateur;
};

Utilisateur.addUtilisateur = (newUtilisateur, result) => {
  dbConn.query("INSERT INTO utilisateur SET ?", newUtilisateur, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Utilisateur.loginUtilisateur = (values, result) => {
  let requete;
  if (values.identification && values.mdp) {
    requete = "SELECT * FROM utilisateur WHERE identification=? AND mdp=?";
  }
  dbConn.query(requete, [values.identification, values.mdp], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Utilisateur.getAllUtilisateurs = (result) => {
  dbConn.query("SELECT * FROM utilisateur", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Utilisateur.getIdUtilisateur = (idUtilisateur, result) => {
  dbConn.query(
    "SELECT * FROM utilisateur WHERE idUtilisateur = ?",
    idUtilisateur,
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Utilisateur.searchUtilisateur = (valeur, result) => {
  dbConn.query(
    `SELECT * FROM utilisateur WHERE identification LIKE '%${valeur}%'`,
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        if (res.length !== 0) {
          result(null, { res, message: "trouvable !", success: true });
        } else {
          result(null, { res, message: "Introuvable !", success: false });
        }
      }
    }
  );
};

Utilisateur.updateUtilisateur = (updateUtilisateur, idUtilisateur, result) => {
  dbConn.query(
    `update utilisateur set ? where idUtilisateur = ${idUtilisateur}`,
    updateUtilisateur,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Utilisateur.etatUtilisateur = (upEtatUtilisateur, idUtilisateur, result) => {
  dbConn.query(
    `update utilisateur set ? where idUtilisateur = ${idUtilisateur}`,
    upEtatUtilisateur,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Utilisateur.getLastIdUtilisateur = (result) => {
  dbConn.query(
    "SELECT idUtilisateur FROM utilisateur ORDER BY idUtilisateur DESC LIMIT 1",
    (err, res) => {
      if (err) {
        return result(err, null);
      } else {
        return result(null, res[0]);
      }
    }
  );
};
module.exports = Utilisateur;
