"use strict";
const Profession = require("../models/profession.model");

module.exports.addProfession = (req, res) => {
  const { nomProfession } = req.body;

  const newProfession = {
    nomProfession,
  };

  Profession.addProfession(newProfession, (erreur, resp) => {
    if (erreur) {
      res.send(erreur);
    } else {
      res.send(resp);
    }
  });
};

module.exports.getAllProfessions = (req, res) => {
  Profession.getAllIProfessions((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getidProfession = (req, res) => {
  Profession.getidProfession(req.params.idProfession, (err, resp) => {
    if (!err) {
      if (resp.length !== 0) {
        res.send(resp);
      } else {
        res.send({ message: "idProfession non trouver" });
      }
    } else {
      res.send(err);
    }
  });
};

module.exports.searchdProfession = (req, res) => {
  Profession.searchProfession(req.params.valeur, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updateProfession = (req, res) => {
  const { nomProfession } = req.body;
  const updateProfessionNom = {
    nomProfession,
  };

  Profession.updateProfession(
    updateProfessionNom,
    req.params.idProfession,
    (err, resp) => {
      if (!err) {
        res.send(resp);
      } else {
        res.send(err);
      }
    }
  );
};

module.exports.deleteProfession = (req, res) => {
  Profession.deleteProfession(req.params.idProfession, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};
