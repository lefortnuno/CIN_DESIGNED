const router = require("express").Router();
const ProfessionController = require("../controllers/profession.controller");

router.get("/", ProfessionController.getAllProfessions);
router.get("/:idProfession", ProfessionController.getidProfession);
router.post("/", ProfessionController.addProfession);
router.put("/:idProfession", ProfessionController.updateProfession);
router.get("/recherche/:valeur", ProfessionController.searchdProfession);
router.delete("/:idProfession", ProfessionController.deleteProfession);

module.exports = router;

