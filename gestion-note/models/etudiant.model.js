var dbConn = require("../config/db.config");

var Etudiants = function (etudiant) {
    this.no_etudiant = etudiant.no_etudiant;
    this.nom = etudiant.nom;
    this.niveau = etudiant.niveau;
};

Etudiants.getAllEtudiants = function (result) {
    dbConn.query("SELECT * from etudiants", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
Etudiants.addEtudiant = function (newEtudiant, result) {
    dbConn.query("insert into etudiants set ?", newEtudiant, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Ajout avec succes id: ${res.insertId}` });
        }
    });
};
Etudiants.getByIDEtudiant = function (id, result) {
    dbConn.query("select * from etudiants where id = ?", id, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


Etudiants.getByNoEtudiant = function (no_etudiant, result) {
    dbConn.query("select * from etudiants where no_etudiant = ?", no_etudiant, function (err, res) {
        if (err) {
            return result(err, null);
        } else {
            return result(null, res[0]);
        }
    });
};

Etudiants.searchEtudiant = function (values, result) {
    var req
    if (values.no_etudiant && values.nom && values.niveau) {
        req = "select * from etudiants where no_etudiant = ? AND nom = ? AND niveau = ?"
    } else {
        req = "select * from etudiants where no_etudiant = ? or nom = ? or niveau = ?"
    }
    dbConn.query(req, [values.no_etudiant, values.nom, values.niveau], function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
Etudiants.updateEtudiant = function (newEtudiant, id, result) {
    dbConn.query(`update etudiants set ? where id = ${id}`, newEtudiant, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
Etudiants.deleteEtudiant = function (id, result) {
    dbConn.query(`delete from etudiants  where id = ${id}`, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Suppression succes id : ${id}` });
        }
    });
};

module.exports = Etudiants;