"use strict";
const Individu = require("../models/Individu.model");
const ProcedureCIN = require("../models/procedure.cin.model");
const path = require("path");
const multer = require("multer");

const storageFace = multer.diskStorage({
    destination: path.join(__dirname, '../../front-react-cin/public/', 'fiche-mere-pic/frontEnd'),
    filename: function (req, file, cb) {   
        cb(null, Date.now() + '-' + file.originalname )  
    }
})
const storageDos = multer.diskStorage({
    destination: path.join(__dirname, '../../front-react-cin/public/', 'fiche-mere-pic/backEnd'),
    filename: function (req, file, cb) {   
        cb(null, Date.now() + '-' + file.originalname )  
    }
})

module.exports.addIndividu = (request, result) => {
  const {
    cin,
    nom,
    prenom,
    nomPere,
    nomMere,
    lieunais,
    datenais,
    domicile,
    cicatrice,
    longueur,
    idOrigine,
    idArrondissement,
    idProfession,
    numSeries,
    etatCIN,
    idUtilisateur,
    observation,
  } = request.body;

  const imgFaceFM = "Aucune";
  const imgDosFM = "Aucune";
  const dateAUjourdhui = new Date();
  const dateLivrance = dateAUjourdhui;
  const dateProcedure = dateAUjourdhui;
  const approbation = "oui";

  const newIndividu = {
    cin,
    nom,
    prenom,
    nomPere,
    nomMere,
    lieunais,
    datenais,
    domicile,
    cicatrice,
    longueur,
    dateLivrance,
    imgFaceFM,
    imgDosFM,
    idOrigine,
    idArrondissement,
    idProfession,
  };

  const newProcedure = {
    cin,
    numSeries,
    etatCIN,
    idUtilisateur,
    observation,
    dateProcedure,
    approbation,
  };

  Individu.addIndividu(newIndividu, (erreur, resp) => {
    if (erreur) {
      result.send(erreur);
    } else {
      ProcedureCIN.addProcedure_CIN(newProcedure, (err, res) => {
        if (err) {
          result.send(err);
        } else {
          result.send(resp);
        }
      });
    }
  });
};

module.exports.addIndividuFMFace = (req, res) => {
  try {
    // 'avatar' is the name of our file input field in the HTML form
    let upload = multer({ storage: storageFace }).single("imgFaceFM");

    upload(req, res, function (err) {
      if (!req.file) {
        return res.send("Please select an image to upload");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }

      const classifiedsadd = {
        imgFaceFM: req.file.filename,
      };

      Individu.addIndividuFMFace(classifiedsadd,  req.params.cin, (err, resp) => {
        if (err) {
          res.send(err);
        } else {
          res.send(resp);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.addIndividuFMDos = (req, res) => {
  try {
    // 'avatar' is the name of our file input field in the HTML form
    let upload = multer({ storage: storageDos }).single("imgDosFM");

    upload(req, res, function (err) {
      if (!req.file) {
        return res.send("Please select an image to upload");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }

      const classifiedsadd = {
        imgDosFM: req.file.filename,
      };

      Individu.addIndividuFMFace(classifiedsadd,  req.params.cin, (err, resp) => {
        if (err) {
          res.send(err);
        } else {
          res.send(resp);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getAllIndividus = (req, res) => {
  Individu.getAllIndividus((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getCinIndividu = (req, res) => {
  Individu.getCinIndividu(req.params.cin, (err, resp) => {
    if (!err) {
      if (resp.length !== 0) {
        res.send(resp);
      } else {
        res.send({ message: "Cin non trouver" });
      }
    } else {
      res.send(err);
    }
  });
};

module.exports.SearchIndividu = (req, res) => {
  Individu.SearchIndividu(req.params.valeur, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updateIndividu = (req, res) => {
  let {
    cin,
    nom,
    prenom,
    nomPere,
    nomMere,
    lieunais,
    datenais,
    domicile,
    cicatrice,
    longueur,
    dateLivrance,
    imgFaceFM,
    imgDosFM,
    idOrigine,
    idArrondissement,
    idProfession,
  } = req.body;

  console.log("datenais01 : ", datenais);
  console.log("dateLivrance01 : ", dateLivrance);

  const tmpDate = datenais.split("-");
  const tmpDate2 = dateLivrance.split("-");

  datenais = tmpDate[2] + `-` + tmpDate[1] + `-` + tmpDate[0];
  dateLivrance = tmpDate2[2] + `-` + tmpDate2[1] + `-` + tmpDate2[0];

  console.log("datenais02 : ", datenais);
  console.log("dateLivrance02 : ", dateLivrance);
  const updateIndividu = {
    cin,
    nom,
    prenom,
    nomPere,
    nomMere,
    lieunais,
    datenais,
    domicile,
    cicatrice,
    longueur,
    dateLivrance,
    imgFaceFM,
    imgDosFM,
    idOrigine,
    idArrondissement,
    idProfession,
  };
  Individu.updateIndividu(updateIndividu, req.params.cin, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};
