"use strict";
const origine = require("../models/origine.model");

module.exports.addOrigine = (req, res) => {
  const { nomOrigine } = req.body;

  const newOrigine = {
    nomOrigine,
  };

  origine.addOrigine(newOrigine, (erreur, resp) => {
    if (erreur) {
      res.send(erreur);
    } else {
      res.send(resp);
    }
  });
};

module.exports.getAllOrigines = (req, res) => {
  origine.getAllIOrigines((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getidOrigine = (req, res) => {
  origine.getidOrigine(req.params.idOrigine, (err, resp) => {
    if (!err) {
      if (resp.length !== 0) {
        res.send(resp);
      } else {
        res.send({ message: "idOrigine non trouver" });
      }
    } else {
      res.send(err);
    }
  });
};

module.exports.searchOrigine = (req, res) => {
  origine.searchOrigine(req.params.valeur, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updateOrigine = (req, res) => {
  const { nomOrigine } = req.body;
  const updateOrigineNom = {
    nomOrigine,
  };

  origine.updateOrigine(updateOrigineNom, req.params.idOrigine, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.deleteOrigine = (req, res) => {
  origine.deleteOrigine(req.params.idOrigine, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};
