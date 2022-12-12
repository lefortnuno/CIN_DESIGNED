"use strict";
const ProcedureCIN = require("../models/procedure.cin.model");

module.exports.addProcedureCIN = (req, res) => {
  const { etatCin, numSeries, observation, idUtilisateur, cin } = req.body;
  const approbation = "oui";
  const dateProcedure = new Date();

  const newProcedureCIN = {
    etatCin,
    approbation,
    dateProcedure,
    numSeries,
    observation,
    idUtilisateur,
    cin,
  };

  ProcedureCIN.addProcedure_CIN(newProcedureCIN, (erreur, resp) => {
    if (erreur) {
      res.send(erreur);
    } else {
      res.send(resp);
    }
  });
};

module.exports.getAllProcedures = (req, res) => {
  ProcedureCIN.getAllProcedures((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getIdProcedure = (req, res) => {
  ProcedureCIN.getIdProcedure(req.params.idProcedureCin, (err, resp) => {
    if (!err) {
      if (resp.length !== 0) {
        res.send(resp);
      } else {
        res.send({ message: " non trouver" });
      }
    } else {
      res.send(err);
    }
  });
};

module.exports.SearchProcedure = (req, res) => {
  ProcedureCIN.searchProcedure_CIN(req.params.valeur, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updateProcedureCIN = (req, res) => {
  let { etatCin, numSeries, cin, idUtilisateur } = req.body;
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const approbation = "non";
  const tmpDate = new Date();
  let AujourdHui =
    tmpDate.getDate() + `/` + month[tmpDate.getMonth()] + `/` + tmpDate.getFullYear();
  let observation =
    ` Modifier le ` + AujourdHui + `, par `;
  console.log(observation);

  const updateProcedureCIN = {
    etatCin,
    numSeries,
    observation,
    cin,
    idUtilisateur,
  };
  ProcedureCIN.updateProcedure_CIN(
    updateProcedureCIN,
    req.params.idProcedureCin,
    (err, resp) => {
      if (!err) {
        res.send(resp);
      } else {
        res.send(err);
      }
    }
  );
};
