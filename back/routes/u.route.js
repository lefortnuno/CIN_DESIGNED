const router = require("express").Router();
const utilisateurController = require("../controllers/u.controller");

router.get("/", utilisateurController.getAllUtilisateurs);
router.post("/", utilisateurController.addUtilisateur);

module.exports = router;
