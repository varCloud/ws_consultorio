const catalogoDAO = require("../../DAO/catalogoDAO");
const utils = require("../utilerias/utils")

async function obtenerTiposUsuarios(req, res) {
    try {
        const postData = req.body;
        let data = await catalogoDAO.obtenerTiposUsuarios(postData);
        return res.status(200).json(data);
    } catch (ex) {
        res.status(500).json(utils.errorGenerico(ex));
    }
}


async function obtenerTiposHitoriasClinicas(req, res) {
    try {
        const postData = req.body;
        let data = await catalogoDAO.obtenerTiposHitoriasClinicas(postData);
        return res.status(200).json(data);
    } catch (ex) {
        res.status(500).json(utils.errorGenerico(ex));
    }
}


async function obtenerPreguntasXHistoriaClinica(req, res) {
    try {
        const postData = req.body;
        let data = await catalogoDAO.obtenerPreguntasXHistoriaClinica(postData);
        return res.status(200).json(data);
    } catch (ex) {
        res.status(500).json(utils.errorGenerico(ex));
    }
}





module.exports = {
    obtenerTiposUsuarios,
    obtenerTiposHitoriasClinicas,
    obtenerPreguntasXHistoriaClinica
}