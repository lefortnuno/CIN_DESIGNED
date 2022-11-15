const router = require("express").Router();
const etudiantController = require("../controllers/etudiant.controller");

router.get("/", etudiantController.getAllEtudiants);
router.get("/:id", etudiantController.getbyIDEtudiants);
router.post("/", etudiantController.addEtudiant);
router.put("/:id", etudiantController.updateEtudiant);
router.delete("/:id", etudiantController.deleteEtudiant);
router.post("/search", etudiantController.search)
module.exports = router;