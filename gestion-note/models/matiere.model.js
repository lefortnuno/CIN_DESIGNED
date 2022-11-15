var dbConn = require("../config/db.config");

var Matieres = function (matiere) {
    this.code_mat = matiere.code_mat;
    this.libelle = matiere.libelle;
    this.coef = matiere.coef;
};

Matieres.getAllMatieres = function (result) {
    dbConn.query("SELECT * from matieres", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
Matieres.addMatiere = function (newMatieres, result) {
    dbConn.query("insert into matieres set ?", newMatieres, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Ajout avec succes id: ${res.insertId}` });
        }
    });
};
Matieres.getByIDMatiere = function (id, result) {
    dbConn.query("select * from matieres where id = ?", id, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Matieres.getByNoMat = function (codeMat, result) {
    dbConn.query("select * from matieres where code_mat = ?", codeMat, function (err, res) {
        if (err) {
            return err;
        } else {
            return result(null, res[0]);
        }
    });
};
Matieres.updateMatiere = function (newMatieres,id, result) {
    dbConn.query(`update matieres set ? where id = ${id}`, newMatieres, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, {message : `update avec success id : ${id}`});
        }
    });
};
Matieres.deleteMatiere = function (id, result) {
    dbConn.query(`delete from matieres  where id = ${id}`, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, {message: `Suppression succes id : ${id}`});
        }
    });
};

module.exports = Matieres;