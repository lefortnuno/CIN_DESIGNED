let dbConn = require("../config/bdd");

let Profession = function (profession) {
  this.idProfession = profession.idProfession;
  this.nomProfession = profession.nomProfession;
};

Profession.addProfession = (newProfession, result) => {
  dbConn.query("INSERT INTO Profession SET ?", newProfession, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Profession.getAllIProfessions = (result) => {
  dbConn.query("SELECT * FROM Profession", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Profession.getidProfession = (idProfession, result) => {
  dbConn.query(
    "SELECT * FROM Profession WHERE idProfession = ?",
    idProfession,
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Profession.searchProfession  = (valeur, result) => {
  dbConn.query(
    `SELECT * FROM profession WHERE nomProfession LIKE '%${valeur}%'`,
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

Profession.updateProfession = (updateProfession, idProfession, result) => {
  dbConn.query(
    `update Profession set ? where idProfession = ${idProfession}`,
    updateProfession,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Profession.deleteProfession = (idProfession, result) => {
  dbConn.query(
    `DELETE  FROM Profession WHERE idProfession=${idProfession}`,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Profession;
