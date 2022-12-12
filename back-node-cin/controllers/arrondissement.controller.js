"use strict";
const arrondissement = require("../models/arrondissement.model");

module.exports.addArrondissement = (req, res) => {
  const { nomArrondissement } = req.body;

  const newArrondissement = {
    nomArrondissement
  };

  arrondissement.addArrondissement(newArrondissement, (erreur, resp) => {
    if (erreur) {
      res.send(erreur);
    } else {
      res.send(resp);
    }
  });
};

module.exports.getAllArrondissements = (req, res) => {
  arrondissement.getAllArrondissements((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getIdArrondissement = (req, res) => {
  arrondissement.getIdArrondissement(req.params.idArrondissement, (err, resp) => {
    if (!err) {
      if (resp.length !== 0) {
        res.send(resp);
      } else {
        res.send({ message: "arrondissement non trouver" });
      }
    } else {
      res.send(err);
    }
  });
};


module.exports.searchdArrondissement = (req, res) => {
  arrondissement.searchArrondissement(req.params.valeur, (err, resp) => {
  if (!err) {
    res.send(resp);
  } else {
    res.send(err);
  }
});
};

module.exports.updateArrondissement = (req, res) => {
  const { nomArrondissement } = req.body;
  const updateArrondissement = {
    nomArrondissement
  };

  arrondissement.updateArrondissement(updateArrondissement,
    req.params.idArrondissement,
    (err, resp) => {
      if (!err) {
        res.send(resp);
      } else {
        res.send(err);
      }
    }
  );
};

module.exports.deleteArrondissement = (req, res) => {
  arrondissement.deleteArrondissement(req.params.idArrondissement, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  })
}