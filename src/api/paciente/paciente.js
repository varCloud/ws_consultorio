const { Router } = require("express");
const router = Router();
const controller = require("./pacienteController");
const token = require("../token/tokenController");

router.post("/login", controller.logIn);

router.post("/obtenerPacientes",token.validateToken , controller.obtenerPacientes);

router.post("/guardarRespuestaHistoriaClinica",token.validateToken ,controller.guardarRespuestaHistoriaClinica);

router.post("/registrarPaciente",token.validateToken ,controller.registrarPaciente);

router.post("/obtenerPreguntasRespuestasXPaciente",token.validateToken ,controller.obtenerPreguntasRespuestasXPaciente);

router.post("/obtenerPacienteXId",token.validateToken ,controller.obtenerPacienteXId);

router.post("/actualizarPerfilUsuario",token.validateToken ,controller.actualizarPerfilUsuario);



module.exports = router;