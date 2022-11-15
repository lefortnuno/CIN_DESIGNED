"use strict";
const Etudiant = require("../models/etudiant.model");


module.exports.getAllEtudiants = (req, res) => {
    Etudiant.getAllEtudiants((err, resp) => {
        res.send(resp)
    })
}
module.exports.getbyIDEtudiants = (req, res) => {
    Etudiant.getByIDEtudiant(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.search = (req, res) => {
    const { no_etudiant, nom, niveau } = req.body;
    Etudiant.searchEtudiant({ no_etudiant, nom, niveau }, (err, resp) => {
        res.send(resp)
    })

}
module.exports.addEtudiant = (req, res) => {
    const { no_etudiant, nom, niveau } = req.body;
    const newEtudiant = {
        no_etudiant, nom, niveau
    }
    Etudiant.addEtudiant(newEtudiant, (err, resp) => {
        res.send(resp)
    })
}
module.exports.updateEtudiant = (req, res) => {
    const { no_etudiant, nom, niveau } = req.body;
    const newEtudiant = {
        no_etudiant, nom, niveau
    }
    Etudiant.updateEtudiant(newEtudiant, req.params.id, (err, resp) => {
        res.send(resp)
    })
}
module.exports.deleteEtudiant = (req, res) => {
    Etudiant.deleteEtudiant(req.params.id, (err, resp) => {
        res.send(resp)
    })
}