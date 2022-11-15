var dbConn = require("../config/db.config");
var etudiant = require('./etudiant.model')
var note = require('./matiere.model')

var Notes = function (note) {
    this.no_etudiant = note.no_etudiant;
    this.code_mat = note.code_mat;
    this.no_inscription = note.no_inscription;
    this.note = note.note;
};

Notes.addNote = function (newNotes, result) {
    etudiant.getByNoEtudiant(newNotes.no_etudiant, (err, resEt) => {
        note.getByNoMat(newNotes.code_mat, (errs, resMat) => {
            if (resMat && resEt) {
                dbConn.query("insert into notes set ?", newNotes, function (err, res) {
                    if (err) {
                        result(err, null);
                    } else {
                        result(null, { message: `Ajout avec succes id: ${res.insertId}` });
                    }
                });
            } else if (resMat && !resEt) {
                result(null, { message: 'etudiant inconnu' })

            } else if (!resMat && resEt) {
                result(null, { message: 'matiere inconnu' })
            }
        })

    });
};

Notes.getAllNote = function (result) {
    dbConn.query("SELECT * from notes", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}
Notes.getbyIDNote = function (id, result) {
    dbConn.query("SELECT * from notes where id = ?", id, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}
Notes.deleteNote = function (id, result) {
    dbConn.query(`delete from notes  where id = ${id}`, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Suppression succes id : ${id}` });
        }
    });
}
Notes.updateNote = function (newNotes, id, result) {
    etudiant.getByNoEtudiant(newNotes.no_etudiant, (err, resEt) => {
        note.getByNoMat(newNotes.code_mat, (errs, resMat) => {
            if (resMat && resEt) {
                dbConn.query(`update notes set ? where id = ${id}`, newNotes, function (err, res) {
                    if (err) {
                        result(err, null);
                    } else {
                        result(null, { message: `modification avec succes id: ${id}` });
                    }
                });
            } else if (resMat && !resEt) {
                result(null, { message: 'etudiant inconnu' })

            } else if (!resMat && resEt) {
                result(null, { message: 'matiere inconnu' })
            }
        })

    });
};

Notes.getAllBull = function (result) {
    dbConn.query("SELECT notes.id as ID, etudiants.no_etudiant as  no_etudiant, etudiants.nom as nom, matieres.libelle as matiere, matieres.coef as coeficient, notes.note as note, (notes.note * matieres.coef) as note_pond FROM etudiants INNER JOIN notes ON etudiants.no_etudiant = notes.no_etudiant INNER JOIN matieres on matieres.code_mat = notes.code_mat", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}
Notes.getBullByEtudiant = function (value, result) {
    dbConn.query("SELECT notes.id as ID, etudiants.no_etudiant as  no_etudiant, etudiants.nom as nom, matieres.libelle as matiere, matieres.coef as coeficient, notes.note as note, (notes.note * matieres.coef) as note_pond FROM etudiants INNER JOIN notes ON etudiants.no_etudiant = notes.no_etudiant INNER JOIN matieres on matieres.code_mat = notes.code_mat where etudiants.no_etudiant = ?", value, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}
Notes.getMoyenne = function (value, result) {
    dbConn.query("SELECT  SUM(notes.note * matieres.coef) / SUM(matieres.coef) as 'Moyenne' FROM etudiants INNER JOIN notes ON etudiants.no_etudiant = notes.no_etudiant INNER JOIN matieres on matieres.code_mat = notes.code_mat where etudiants.no_etudiant = ?", value, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}
Notes.classementEtudiant = function (value, result) {
    dbConn.query("SELECT etudiants.nom as Nom, etudiants.no_etudiant as No_etudiant,( SUM(notes.note * matieres.coef) / SUM(matieres.coef)) as Moyenne FROM etudiants INNER JOIN notes ON etudiants.no_etudiant = notes.no_etudiant INNER JOIN matieres on matieres.code_mat = notes.code_mat WHERE etudiants.niveau = ? GROUP BY etudiants.nom ORDER By Moyenne DESC", value, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}



module.exports = Notes