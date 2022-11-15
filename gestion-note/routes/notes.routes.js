const router = require("express").Router();
const noteController = require("../controllers/note.controller");

router.post("/", noteController.addNote);
router.get("/", noteController.getAllNote);
router.get("/:id", noteController.getbyIDNote);
router.put("/:id", noteController.updateNote);
router.delete("/:id", noteController.deleteNote);

module.exports = router;