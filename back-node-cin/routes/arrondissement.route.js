const router = require("express").Router();
const arrondissementController = require("../controllers/arrondissement.controller");

router.get("/", arrondissementController.getAllArrondissements);
router.get("/:idArrondissement", arrondissementController.getIdArrondissement);
router.post("/", arrondissementController.addArrondissement);
router.put("/:idArrondissement", arrondissementController.updateArrondissement);
router.get("/recherche/:valeur", arrondissementController.searchdArrondissement);
router.delete("/:idArrondissement", arrondissementController.deleteArrondissement);

module.exports = router;

