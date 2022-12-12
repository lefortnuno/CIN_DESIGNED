let dbConn = require("../config/bdd");

let origine = function (origine) {
  this.idOrigine = origine.idOrigine;
  this.nomOrigine = origine.nomOrigine;
};

origine.addOrigine = (newOrigine, result) => {
  dbConn.query("INSERT INTO origine SET ?", newOrigine, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

origine.getAllIOrigines = (result) => {
  dbConn.query("SELECT * FROM origine", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

origine.getidOrigine = (idOrigine, result) => {
  dbConn.query(
    "SELECT * FROM origine WHERE idOrigine = ?",
    idOrigine,
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

origine.searchOrigine = (valeur, result) => {
  dbConn.query(
    `SELECT * FROM origine WHERE nomOrigine LIKE '%${valeur}%'`,
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

origine.updateOrigine = (updateOrigine, idOrigine, result) => {
  dbConn.query(
    `update origine set ? where idOrigine = ${idOrigine}`,
    updateOrigine,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

origine.deleteOrigine = (idOrigine, result) => {
  dbConn.query(
    `DELETE  FROM origine WHERE idOrigine=${idOrigine}`,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = origine;
