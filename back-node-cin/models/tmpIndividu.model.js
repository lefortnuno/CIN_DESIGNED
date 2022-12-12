let dbConn = require("../config/bdd");

let tmpIndividu = function (tmpIndividu) {
  this.idtmpIndividu = tmpIndividu.idtmpIndividu;
  this.cin = tmpIndividu.cin;
  this.nom = tmpIndividu.nom;
  this.prenom = tmpIndividu.prenom;
  this.nomPere = tmpIndividu.nomPere;
  this.nomMere = tmpIndividu.nomMere;
  this.lieunais = tmpIndividu.lieunais;
  this.datenais = tmpIndividu.datenais;
  this.profession = tmpIndividu.profession;
  this.domicile = tmpIndividu.domicile;
  this.cicatrice = tmpIndividu.cicatrice;
  this.longueur = tmpIndividu.longueur;
  this.dateLivrance = tmpIndividu.dateLivrance;
  this.imgFaceFM = tmpIndividu.imgFaceFM
  this.imgDosFM = tmpIndividu.imgFaceFM
  this.idOrigine = tmpIndividu.idOrigine;
  this.idArrondissement = tmpIndividu.idArrondissement;
  this.idObservation = tmpIndividu.idObservation;
  this.nomMere = tmpIndividu.nomMere;
  this.approbation = tmpIndividu.approbation;
};

tmpIndividu.addtmpIndividu = (newtmpIndividu, result) => {
  dbConn.query("INSERT INTO tmpindividu SET ?", newtmpIndividu, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

tmpIndividu.addTmpIndividuFMFace = (addIndividuFMFace, cin, result) => {
  dbConn.query(
    `update tmpindividu set ? where cin = ${cin}`,
    addIndividuFMFace,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

tmpIndividu.addTmpIndividuFMDos = (addIndividuFMDos, cin, result) => {
  dbConn.query(
    `update tmpindividu set ? where cin = ${cin}`,
    addIndividuFMDos,
    function (err, res) {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        console.log(res);
        result(null, res);
      }
    }
  );
};

tmpIndividu.getAlltmpIndividus = (result) => {
  dbConn.query("SELECT * FROM tmpIndividu where approbation = 'non' ", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

tmpIndividu.getidtmpIndividu = (idtmpIndividu, result) => {
  dbConn.query(
    "SELECT * FROM tmpIndividu WHERE idtmpIndividu = ?",
    idtmpIndividu,
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

tmpIndividu.searchtmpIndividu = (valeur, result) => {
  dbConn.query(
    `SELECT * FROM tmpIndividu WHERE nom LIKE '%${valeur}%'`,
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

tmpIndividu.updatetmpIndividu = (updatetmpIndividu, idtmpIndividu, result) => {
  dbConn.query(
    `update tmpindividu set ? where idtmpIndividu = ${idtmpIndividu}`,
    updatetmpIndividu,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = tmpIndividu;
