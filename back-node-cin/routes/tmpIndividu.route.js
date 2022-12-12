router.get("/", tmpIndividuController.getAlltmpIndividus);
router.get("/:idtmpIndividu", tmpIndividuController.getidtmpIndividu);
router.post("/", tmpIndividuController.addtmpIndividu);
router.put("/:idtmpIndividu", tmpIndividuController.updatetmpIndividu);
router.put("/imageFaceFM/:cin", tmpIndividuController.addTmpIndividuFMFace);
router.put("/imageDosFM/:cin", tmpIndividuController.addTmpIndividuFMDos);
router.get("/recherche/:valeur", tmpIndividuController.SearchtmpIndividu);

module.exports = router;
