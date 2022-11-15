const router = require("express").Router();
const noteController = require("../controllers/note.controller");
router.get("/:niveau", noteController.classementEtudiants);

module.exports = router;