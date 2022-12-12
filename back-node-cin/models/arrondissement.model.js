let dbConn = require('../config/bdd')

let arrondissement = function (arrondissement) {
    this.idArrondisseent = arrondissement.idArrondissement
    this.nomArrondissement= arrondissement.nomArrondissement
    
}
arrondissement.addArrondissement = (newArrondissement, result) => {
    dbConn.query("INSERT INTO arrondissement SET ?", newArrondissement, (err, res) => {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
}
arrondissement.getAllArrondissements = (result) => {
    dbConn.query("SELECT * FROM arrondissement", (err, res) => {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

arrondissement.getIdArrondissement = (idArrondissement, result) => {
    dbConn.query("SELECT * FROM arrondissement WHERE idArrondissement = ?", idArrondissement, (err, res) => {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

arrondissement.searchArrondissement = (valeur, result) => {
  dbConn.query(
    `SELECT * FROM arrondissement WHERE nomArrondissement LIKE '%${valeur}%'`,
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

arrondissement.updateArrondissement = (updateArrondissement, idArrondissement, result) => {
    dbConn.query(`update arrondissement set ? where idArrondissement = ${idArrondissement}`, updateArrondissement, function(err, res){
        if(err) {
            result(err, null)
        }else{
           result(null, res)
        }
    })
}

arrondissement.deleteArrondissement = (idArrondissement, result) => {
    dbConn.query(`DELETE  FROM arrondissement WHERE idArrondissement=${idArrondissement}`, function(err, res){
        if(err){
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

module.exports = arrondissement;