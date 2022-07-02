const db = require("../config/database");
const configGlobal = require('../config/config');
const axios = require("axios");
const messageClient = "Error interno de integración, por favor contacta a soporte técnico."

async function obtenerTiposUsuarios(postData) {
    let response = {};
    try {

        let sql = `CALL SP_USUARIO_OBTENER_TIPOS_USUARIOS()`;
        let result = await db.query(sql, [postData.idOperator]);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.estatus == 200) {
            response.modelo = JSON.parse(JSON.stringify(result[1]));
        }
        return response;

    } catch (ex) {
        throw ex;
    }
}

async function obtenerTiposHitoriasClinicas(postData) {
    let response = {};
    try {

        let sql = `CALL SP_OBTENER_TIPOS_HISTORIAS_CLINICAS()`;
        let result = await db.query(sql, [postData.idOperator]);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.estatus == 200) {
            response.modelo = JSON.parse(JSON.stringify(result[1]));
        }
        return response;

    } catch (ex) {
        throw ex;
    }
}

async function obtenerPreguntasXHistoriaClinica(postData) {
    let response = {};
    try {

        let sql = `CALL SP_OBTENER_PREGUNTAS_X_HISTORIA_CLINICA(?)`;
        let result = await db.query(sql, [postData.idTipoHistoriaClinica]);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.estatus == 200) {
            response.modelo = JSON.parse(JSON.stringify(result[1]));
        }
        return response;

    } catch (ex) {
        throw ex;
    }
}



module.exports = {
    obtenerTiposHitoriasClinicas,
    obtenerTiposUsuarios,
    obtenerPreguntasXHistoriaClinica
}