const router = require("express").Router();
const noteController = require("../controllers/note.controller");

router.get("/", noteController.getAllBulletins);
router.get("/:no_etudiant", noteController.getBulletinByEtudiant);
router.get("/moyenne/:no_etudiant", noteController.getMoyenne);
// router.get("/classement/:niveau", noteController.classement);

module.exports = router;