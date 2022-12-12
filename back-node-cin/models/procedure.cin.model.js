let dbConn = require('../config/bdd')

let Procedure_CIN = function (procedureCIN) {
    this.idProcedureCin = procedureCIN.idProcedureCin
    this.approbation = procedureCIN.approbation
    this.etatCin = procedureCIN.etatCin
    this.dateProcedure = procedureCIN.dateProcedure
    this.numSeries = procedureCIN.numSeries
    this.observation = procedureCIN.observation
    this.idUtilisateur = procedureCIN.idUtilisateur
    this.cin = procedureCIN.cin
}

const procedure = `Select idProcedureCin, approbation, etatCin, DATE_FORMAT(dateProcedure, '%d/%m/%Y') as dateProcedure, numSeries, observation, individu.cin, nom, prenom, identification from individu, procedure_cin, utilisateur where utilisateur.idUtilisateur = procedure_cin.idUtilisateur AND individu.cin = procedure_cin.cin `
const ordre = ` order by idProcedureCin desc `

Procedure_CIN.addProcedure_CIN = (newProcedure, result) => {
    dbConn.query("INSERT INTO Procedure_CIN SET ?", newProcedure, (err, res) => {
        if (err) {
            result(err, null)
        } else {
            result(null, {success:true});
        }
    })
}

Procedure_CIN.getAllProcedures = (result) => {
    dbConn.query(procedure+ordre, (err, res) => {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

Procedure_CIN.getIdProcedure= (idProcedureCin, result) => {
    dbConn.query( procedure+ `AND idProcedureCin = ?`, idProcedureCin, (err, res) => {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
}


Procedure_CIN.searchProcedure_CIN = (valeur, result) => {
  dbConn.query(
    `SELECT * FROM Procedure_CIN WHERE cin LIKE '%${valeur}%'`,
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


Procedure_CIN.updateProcedure_CIN = (updateProcedure, idProcedureCin, result) => {
    dbConn.query(`update PROCEDURE_CIN set ? where idProcedureCin = ${idProcedureCin}`, updateProcedure, function(err, res){
        if(err) {
            result(err, null)
        }else{
           result(null, res)
        }
    })
}


module.exports = Procedure_CIN;
