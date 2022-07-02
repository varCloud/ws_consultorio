const pacienteDAO = require("../../DAO/pacienteDAO");
const token = require("../token/tokenController");
const utils = require("../utilerias/utils")

async function logIn(req, res) {
    try {
        const postData = req.body;
        if (Object.keys(postData).length !== 0) {
            let data = await pacienteDAO.logIn(postData);
            if(data.estatus == 200){
                data.model.tokenWs = token.generateTokenUser(data.model);
            }
            return res.status(200).json(data);
        } else {
            res.status(400).json(utils.postDataInvalido(postData));
        }
    } catch (ex) {
        res.status(500).json(utils.errorGenerico(ex));
    }
}


async function actualizarPerfilUsuario(req, res) {
    try {
        const postData = req.body;
        if (Object.keys(postData).length !== 0) {
            let data = await pacienteDAO.actualizarPerfilUsuario(postData);
            return res.status(200).json(data);
        } else {
            res.status(400).json(utils.postDataInvalido(postData));
        }
    } catch (ex) {
        res.status(500).json(utils.errorGenerico(ex));
    }
}


async function obtenerPacientes(req, res) {
    try {
        const postData = req.body;
        if (Object.keys(postData).length !== 0) {
            let data = await pacienteDAO.obtenerPacientes(postData);
            return res.status(200).json(data);
        } else {
            res.status(400).json(utils.postDataInvalido(postData));
        }
    } catch (ex) {
        res.status(500).json(utils.errorGenerico(ex));
    }
}


async function registrarPaciente(req, res) {
    try {
        const postData = req.body;
        if (Object.keys(postData).length !== 0) {
            let data = await pacienteDAO.registrarPaciente(postData);
            return res.status(200).json(data);
        } else {
            res.status(400).json(utils.postDataInvalido(postData));
        }
    } catch (ex) {
        res.status(500).json(utils.errorGenerico(ex));
    }
}


async function guardarRespuestaHistoriaClinica(req, res) {
    try {
        const postData = req.body;
        if (Object.keys(postData).length !== 0) {
            let data = await pacienteDAO.guardarRespuestaHistoriaClinica(postData);
            return res.status(200).json(data);
        } else {
            res.status(400).json(utils.postDataInvalido(postData));
        }
    } catch (ex) {
        res.status(500).json(utils.errorGenerico(ex));
    }
}


async function obtenerPreguntasRespuestasXPaciente(req, res) {
    try {
        const postData = req.body;
        if (Object.keys(postData).length !== 0) {
            let data = await pacienteDAO.obtenerPreguntasRespuestasXPaciente(postData);
            return res.status(200).json(data);
        } else {
            res.status(400).json(utils.postDataInvalido(postData));
        }
    } catch (ex) {
        res.status(500).json(utils.errorGenerico(ex));
    }
}


async function obtenerPacienteXId(req, res) {
    try {
        const postData = req.body;
        if (Object.keys(postData).length !== 0) {
            let data = await pacienteDAO.obtenerPacienteXId(postData);
            return res.status(200).json(data);
        } else {
            res.status(400).json(utils.postDataInvalido(postData));
        }
    } catch (ex) {
        res.status(500).json(utils.errorGenerico(ex));
    }
}


module.exports = {
    logIn,
    obtenerPacientes,
    registrarPaciente,
    guardarRespuestaHistoriaClinica,
    obtenerPreguntasRespuestasXPaciente,
    obtenerPacienteXId,
    actualizarPerfilUsuario
}