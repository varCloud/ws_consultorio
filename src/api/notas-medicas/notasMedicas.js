const { Router } = require("express");
const router = Router();
const controller = require("./notasMedicasController");
const token = require("../token/tokenController");

router.post("/guardarNotaMedica",token.validateToken, controller.guardarNotaMedica);

router.post("/obteneNotasMedicasXId",token.validateToken, controller.obteneNotasMedicasXId);

router.post("/obtenerUltimaNotaMedicaXPaciente",token.validateToken, controller.obtenerUltimaNotaMedicaXPaciente);

router.post("/obteneNotasMedicas",token.validateToken, controller.obteneNotasMedicas);

router.post("/obtenerNotaMedicaXPaciente",token.validateToken, controller.obtenerNotaMedicaXPaciente);

module.exports = router;