"use strict";
const tmpIndividu = require("../models/tmpIndividu.model");
const path = require("path");
const multer = require("multer");

const storageFace = multer.diskStorage({
    destination: path.join(__dirname, '../../front-react-cin/public/', 'tmpPic/devant-fiche-mere'),
    filename: function (req, file, cb) {   
        cb(null, Date.now() + '-' + file.originalname )  
    }
})
const storageDos = multer.diskStorage({
    destination: path.join(__dirname, '../../front-react-cin/public/', 'tmpPic/arriere-fiche-mere'),
    filename: function (req, file, cb) {   
        cb(null, Date.now() + '-' + file.originalname )  
    }
})

module.exports.addtmpIndividu = (req, res) => {
  const {
    nom,
    prenom,
    nomPere,
    nomMere,
    lieunais,
    datenais,
    profession,
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

  const approbation = 'non'

  const newtmpIndividu = {
    nom,
    prenom,
    nomPere,
    nomMere,
    lieunais,
    datenais,
    profession,
    domicile,
    cicatrice,
    longueur,
    dateLivrance,
    imgFaceFM,
    imgDosFM,
    idOrigine,
    idArrondissement,
    idProfession,
    approbation,
  };

  tmpIndividu.addtmpIndividu(newtmpIndividu, (erreur, resp) => {
    if (erreur) {
      res.send(erreur);
    } else {
      res.send(resp);
    }
  });
};

module.exports.addTmpIndividuFMFace = (req, res) => {
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

      tmpIndividu.addTmpIndividuFMFace(classifiedsadd,  req.params.cin, (err, resp) => {
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

module.exports.addTmpIndividuFMDos = (req, res) => {
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

      tmpIndividu.addTmpIndividuFMDos(classifiedsadd,  req.params.cin, (err, resp) => {
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


module.exports.getAlltmpIndividus = (req, res) => {
  tmpIndividu.getAlltmpIndividus((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getCintmpIndividu = (req, res) => {
  tmpIndividu.getCintmpIndividu(req.params.idtmpIndividu, (err, resp) => {
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

module.exports.SearchtmpIndividu = (req, res) => {
  tmpIndividu.SearchtmpIndividu(req.params.valeur, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updatetmpIndividu = (req, res) => {
  const {
    nom,
    prenom,
    nomPere,
    nomMere,
    lieunais,
    datenais,
    profession,
    domicile,
    cicatrice,
    longueur,
    dateLivrance,
    imgFaceFM,
    imgDosFM,
    idOrigine,
    idArrondissement,
    idProfession,
    approbation,
  } = req.body;
  const updatetmpIndividu = {
    nom,
    prenom,
    nomPere,
    nomMere,
    lieunais,
    datenais,
    profession,
    domicile,
    cicatrice,
    longueur,
    dateLivrance,
    imgFaceFM,
    imgDosFM,
    idOrigine,
    idArrondissement,
    idProfession,
    approbation,
  };

  tmpIndividu.updatetmpIndividu(
    updatetmpIndividu,
    req.params.idtmpIndividu,
    (err, resp) => {
      if (!err) {
        res.send(resp);
      } else {
        res.send(err);
      }
    }
  );
};
