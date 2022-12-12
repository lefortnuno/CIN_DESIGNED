let dbConn = require("../config/bdd");

let Individu = function (individu) {
  this.cin = individu.cin;
  this.nom = individu.nom;
  this.prenom = individu.prenom;
  this.nomPere = individu.nomPere;
  this.nomMere = individu.nomMere;
  this.lieunais = individu.lieunais;
  this.datenais = individu.datenais;
  this.domicile = individu.domicile;
  this.cicatrice = individu.cicatrice;
  this.longueur = individu.longueur;
  this.dateLivrance = individu.dateLivrance;
  this.imgFaceFM = individu.imgFaceFM;
  this.imgDosFM = individu.imgFaceFM;
  this.idOrigine = individu.idOrigine;
  this.idArrondissement = individu.idArrondissement;
  this.idProcedureCin = individu.idProcedureCin;
  this.idProfession = individu.idProfession;
};

const REQUETE_DE_BASE = `SELECT INDIVIDU.cin, nom, prenom, nomPere, nomMere, lieunais, DATE_FORMAT(datenais, '%d-%m-%Y') as datenais, domicile, cicatrice, longueur, DATE_FORMAT(dateLivrance, '%d-%m-%Y') as dateLivrance, imgFaceFM, imgDosFM, PROFESSION.idProfession, nomProfession, ARRONDISSEMENT.idArrondissement, nomArrondissement, ORIGINE.idOrigine, nomOrigine `;
const REQUETE_FROM = ` FROM INDIVIDU, ARRONDISSEMENT, ORIGINE, PROFESSION WHERE INDIVIDU.idorigine = ORIGINE.idOrigine AND INDIVIDU.idArrondissement = ARRONDISSEMENT.idArrondissement AND INDIVIDU.idProfession = PROFESSION.idProfession `;
const REQUETE_ORDRE = ` ORDER BY nom ASC `;

Individu.addIndividu = (newIndividu, result) => {
  dbConn.query("INSERT INTO individu SET ?", newIndividu, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, { success: true });
    }
  });
};

Individu.addIndividuFMFace = (addIndividuFMFace, cin, result) => {
  dbConn.query(
    `update individu set ? where cin = ${cin}`,
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

Individu.addIndividuFMDos = (addIndividuFMDos, cin, result) => {
  dbConn.query(
    `update individu set ? where cin = ${cin}`,
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

Individu.getAllIndividus = (result) => {
  dbConn.query(REQUETE_DE_BASE + REQUETE_FROM + REQUETE_ORDRE, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Individu.getCinIndividu = (cin, result) => {
  dbConn.query(REQUETE_DE_BASE + REQUETE_FROM + ` AND INDIVIDU.cin = ?`, cin, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Individu.searchIndividu = (valeur, result) => {
  dbConn.query(
    REQUETE_DE_BASE +
      REQUETE_FROM +
      ` AND (nom LIKE '%${valeur}%' OR prenom LIKE '%${valeur}%' OR cin LIKE '%${valeur}%')`
      +REQUETE_ORDRE,
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

Individu.updateIndividu = (updateIndividu, cin, result) => {
  dbConn.query(
    `update individu set ? where cin = ${cin}`,
    updateIndividu,
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

module.exports = Individu;
