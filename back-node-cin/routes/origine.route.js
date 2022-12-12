const router = require("express").Router();
const origineController = require("../controllers/origine.controller");

router.get("/", origineController.getAllOrigines);
router.get("/:idOrigine", origineController.getidOrigine);
router.post("/", origineController.addOrigine);

router.put("/:idOrigine", origineController.updateOrigine);
router.get("/recherche/:valeur", origineController.searchOrigine);
router.delete("/:idOrigine", origineController.deleteOrigine);

module.exports = router;

