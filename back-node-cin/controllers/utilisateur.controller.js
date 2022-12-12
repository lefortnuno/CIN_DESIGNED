"use strict";
const Utilisateur = require("../models/utilisateur.model");
const jwt = require("jsonwebtoken");
const tmp = 3 * 24 * 60 * 60 * 1000;

const createToken = (idUtilisateur) => {
  return jwt.sign({ idUtilisateur }, process.env.TOKEN_SECRET, {
    expiresIn: tmp,
  });
};

module.exports.addUtilisateur = (req, res) => {
  let { identification, mdp } = req.body;
  const attribut = "user";
  const etatUtilisateur = "actif";
  let i = 0;

  Utilisateur.getLastIdUtilisateur((err, resultatLastID) => {
    if (!err) {
      if (!resultatLastID) {
        i = i + 1;
        identification = identification + "-" + i;
      } else {
        let num = Object.values(resultatLastID);
        num = num[0] + 1;
        identification = identification + "-" + num; // kanto-9
      }

      const newUtilisateur = {
        attribut,
        identification,
        mdp,
        etatUtilisateur,
      };

      Utilisateur.addUtilisateur(newUtilisateur, (erreur, resp) => {
        if (erreur) {
          res.send(erreur);
        } else {
          res.send(resp);
        }
      });
    } else {
      res.send(err);
    }
  });
};

module.exports.loginUtilisateur = (req, res) => {
  const { identification, mdp } = req.body;
  Utilisateur.loginUtilisateur({ identification, mdp }, (err, resp) => {
    const token = createToken(resp);
    if (!err) {
      if (resp.length !== 0) {
        res.send({ success: true, token, user: resp });
      } else {
        res.send({ message: "Identification ou mot de passe incorrect" });
      }
    } else {
      res.send(err);
    }
  });
};

module.exports.getAllUtilisateurs = (req, res) => {
  Utilisateur.getAllUtilisateurs((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getIdUtilisateur = (req, res) => {
  Utilisateur.getIdUtilisateur(req.params.idUtilisateur, (err, resp) => {
    if (!err) {
      if (resp.length !== 0) {
        res.send(resp);
      } else {
        res.send({ message: "Id non trouver" });
      }
    } else {
      res.send(err);
    }
  });
};

//dimanche

module.exports.searchUtilisateur = (req, res) => {
  Utilisateur.searchUtilisateur(req.params.valeur, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updateUtilisateur = (req, res) => {
  const { identification, mdp } = req.body;
  const updateUtilisateur = {
    identification,
    mdp,
  };
  Utilisateur.updateUtilisateur(
    updateUtilisateur,
    req.params.idUtilisateur,
    (err, resp) => {
      if (!err) {
        res.send(resp);
      } else {
        res.send(err);
      }
    }
  );
};

module.exports.etatUtilisateur = (req, res) => {
  const { attribut, etatUtilisateur } = req.body;
  const upEtatUtilisateur = {
    attribut,
    etatUtilisateur,
  };
  Utilisateur.etatUtilisateur(
    upEtatUtilisateur,
    req.params.idUtilisateur,
    (err, resp) => {
      if (!err) {
        res.send(resp);
      } else {
        res.send(err);
      }
    }
  );
};
