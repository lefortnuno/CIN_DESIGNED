const router = require("express").Router();
const ProcedureCINController = require("../controllers/procedure.cin.controller");

router.get("/", ProcedureCINController.getAllProcedures);
router.get("/:idProcedureCin", ProcedureCINController.getIdProcedure);
router.post("/", ProcedureCINController.addProcedureCIN);
router.put("/:idProcedureCin", ProcedureCINController.updateProcedureCIN);
router.get("/recherche/:valeur", ProcedureCINController.SearchProcedure);

module.exports = router;




