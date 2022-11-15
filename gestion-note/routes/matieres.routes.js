const router = require("express").Router();
const matiereController = require("../controllers/matiere.controller");

router.get("/", matiereController.getAllMatieres);
router.get("/:id", matiereController.getbyIDMatiere);
router.post("/", matiereController.addMatiere);
router.put("/:id", matiereController.updateMatieres);
router.delete("/:id", matiereController.deleteMatieres);

module.exports = router;