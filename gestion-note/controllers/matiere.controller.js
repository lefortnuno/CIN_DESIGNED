"use strict";
const Matieres = require("../models/matiere.model");


module.exports.getAllMatieres = (req, res) => {
    Matieres.getAllMatieres((err, resp) => {
        res.send(resp)
    })
}
module.exports.getbyIDMatiere = (req, res) => {
    Matieres.getByIDMatiere(req.params.id, (err, resp) => {
        res.send(resp)
    })
}
module.exports.addMatiere = (req, res) => {
    const { code_mat, libelle, coef } = req.body;
    const newMatieres = {
        code_mat, libelle, coef
    }
    Matieres.addMatiere(newMatieres, (err, resp) => {
        res.send(resp)
    })
}
module.exports.updateMatieres = (req, res) => {
    const { code_mat, libelle, coef } = req.body;
    const newMatieres = {
        code_mat, libelle, coef
    }
    Matieres.updateMatiere(newMatieres, req.params.id, (err, resp) => {
        res.send(resp)
    })
}
module.exports.deleteMatieres = (req, res) => {
    Matieres.deleteMatiere(req.params.id, (err, resp) => {
        res.send(resp)
    })
}