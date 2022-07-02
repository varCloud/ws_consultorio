const { Router } = require("express");
const router = Router();
const controller = require("./contrasenaController");

router.post("/generarContrasena", controller.generarContrasena);

module.exports = router;
