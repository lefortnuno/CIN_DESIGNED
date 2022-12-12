const router = require("express").Router();
const utilisateurController = require("../controllers/utilisateur.controller");
const middlewareAuth = require("../middlewares/auth.middlewares");

router.get("/", utilisateurController.getAllUtilisateurs);
router.get("/:idUtilisateur", utilisateurController.getIdUtilisateur);
router.post("/", utilisateurController.addUtilisateur);
router.post("/seConnecter", utilisateurController.loginUtilisateur);
router.put("/:idUtilisateur", utilisateurController.updateUtilisateur);
router.put("/etat/:idUtilisateur", utilisateurController.etatUtilisateur);
router.get("/recherche/:valeur", utilisateurController.searchUtilisateur);

module.exports = router;
