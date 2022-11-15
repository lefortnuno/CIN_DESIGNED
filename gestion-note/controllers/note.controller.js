"use strict";
const Notes = require("../models/note.model");

module.exports.addNote = (req, res) => {
    const { no_etudiant, code_mat, no_inscription, note } = req.body;
    const newNotes = {
        no_etudiant, code_mat, no_inscription, note
    }
    Notes.addNote(newNotes, (err, resp) => {
        res.send(resp)
    })
}
module.exports.getAllNote = (req, res) => {
    Notes.getAllNote((err, resp) => {
        res.send(resp)
    })
}
module.exports.getbyIDNote = (req, res) => {
    Notes.getbyIDNote(req.params.id, (err, resp) => {
        res.send(resp)
    })
}
module.exports.deleteNote = (req, res) => {
    Notes.deleteNote(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updateNote = (req, res) => {
    const { no_etudiant, code_mat, no_inscription, note } = req.body;
    const newNotes = {
        no_etudiant, code_mat, no_inscription, note
    }
    Notes.updateNote(newNotes, req.params.id, (err, resp) => {
        res.send(resp)
    })
}
module.exports.getAllBulletins = (req, res) => {
    Notes.getAllBull((err, resp) => {
        res.send(resp)
    })
}
module.exports.getBulletinByEtudiant = (req, res) => {
    Notes.getBullByEtudiant(req.params.no_etudiant, (err, resp) => {
        res.send(resp)
    })
}
module.exports.getMoyenne = (req, res) => {
    Notes.getMoyenne(req.params.no_etudiant, (err, resp) => {
        if (resp[0].Moyenne >= 10) {
            res.send({ status: "Admis", Moyenne: resp[0].Moyenne })
        } else if (resp[0].Moyenne >= 7.5 && resp[0].Moyenne < 10) {
            res.send({ status: "Rédoublant", Moyenne: resp[0].Moyenne })
        } else if (resp[0].Moyenne < 7.5) {
            res.send({ status: "Exclus", Moyenne: resp[0].Moyenne })

        }
    })
}


module.exports.classementEtudiants = (req,res)=> {
    Notes.classementEtudiant(req.params.niveau, (err,resp)=>{
        res.send(resp)
    })

}