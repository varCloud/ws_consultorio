const { Router } = require("express");
const router = Router();
const controller = require("./catalogoController");
const token = require("../token/tokenController");

router.post("/obtenerTiposUsuarios", controller.obtenerTiposUsuarios);

router.get("/obtenerTiposHitoriasClinicas", controller.obtenerTiposHitoriasClinicas);

router.post("/obtenerPreguntasXHistoriaClinica", controller.obtenerPreguntasXHistoriaClinica);


module.exports = router;