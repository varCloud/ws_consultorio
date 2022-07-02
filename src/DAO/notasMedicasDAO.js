const db = require("../config/database");
const configGlobal = require('../config/config');
const axios = require("axios");
const { LexModelBuildingService } = require("aws-sdk");
const { post } = require("../api/paciente/paciente");
const messageClient = "Error interno de integración, por favor contacta a soporte técnico."

async function guardarNotaMedica(postData) {
    let response = {};
    try {

        let sql = `CALL SP_AGREGAR_ACTUALIZAR_NOTA_MEDICA(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        let result = await db.query(sql, [
            postData.idNotaMedica
            ,postData.idPaciente
            ,postData.peso
            ,postData.talla
            ,postData.ta
            ,postData.fc
            ,postData.fr
            ,postData.temperatura
            ,postData.saturacion
            ,postData.motivoConsulta
            ,postData.diagnostico
            ,postData.tratamiento
            ,postData.laboratorios
        ]);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.estatus == 200) {
            response.modelo = JSON.parse(JSON.stringify(result[1][0]));
        }
        return response;

    } catch (ex) {
        throw ex;
    }
}



async function obteneNotasMedicas(postData) {
    let response = {};
    try {

        let sql = `CALL SP_OBTENER_NOTAS_MEDICAS(?,?,?,?)`;
        let result = await db.query(sql, [
            postData.idPaciente
            ,postData.fechaInicio
            ,postData.fechaFin   
            ,postData.usuario.idUsuario           
        ]);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.estatus == 200) {
            response.modelo = JSON.parse(JSON.stringify(result[1]));
        }
        return response;

    } catch (ex) {
        throw ex;
    }
}

async function obteneNotasMedicasXId(postData) {
    let response = {};
    try {
        let sql = `CALL SP_OBTENER_NOTA_MEDICA_X_ID(?)`;
        let result = await db.query(sql, [
            postData.idNotaMedica             
        ]);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.estatus == 200) {
            response.modelo = JSON.parse(JSON.stringify(result[1][0]));
        }
        return response;

    } catch (ex) {
        throw ex;
    }
}

async function obtenerUltimaNotaMedicaXPaciente(postData) {
    let response = {};
    try {
        let sql = `CALL SP_OBTENER_ULTIMA_NOTA_MEDICA_X_PACIENTE(?)`;
        let result = await db.query(sql, [
            postData.idPaciente             
        ]);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.estatus == 200) {
            response.paciente = JSON.parse(JSON.stringify(result[1][0]));
            response.notaMedica = JSON.parse(JSON.stringify(result[2][0]));
        }
        return response;

    } catch (ex) {
        throw ex;
    }
}


async function obtenerNotaMedicaXPaciente(postData) {
    let response = {};
    try {
        let sql = `CALL SP_OBTENER_NOTAS_MEDICAS_X_PACIENTE(?)`;
        let result = await db.query(sql, [
            postData.idPaciente             
        ]);
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
    guardarNotaMedica,
    obteneNotasMedicas,
    obteneNotasMedicasXId,
    obtenerUltimaNotaMedicaXPaciente,
    obtenerNotaMedicaXPaciente
}

