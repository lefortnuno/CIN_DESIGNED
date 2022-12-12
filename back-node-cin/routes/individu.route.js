const router = require("express").Router();
const IndividuController = require("../controllers/Individu.controller");

router.get("/", IndividuController.getAllIndividus);
router.get("/:cin", IndividuController.getCinIndividu);
router.post("/", IndividuController.addIndividu);
router.put("/:cin", IndividuController.updateIndividu);
router.put("/imageFaceFM/:cin", IndividuController.addIndividuFMFace);
router.put("/imageDosFM/:cin", IndividuController.addIndividuFMDos);
router.get("/recherche/:valeur", IndividuController.SearchIndividu);

module.exports = router;


