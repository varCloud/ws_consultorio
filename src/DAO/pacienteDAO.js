const db = require("../config/database");
const cifrar =require("../api/utilerias/cifrar");


async function logIn(postData){
    let response = {};
    try {
        //let contrasena=await cifrar.generarContrasena(postData.contrasena);
        //console.log(contrasena);
        let sql = `CALL SP_VALIDAR_CONTRASENAS(?,?)`;
        let result = await db.query(sql,[postData.usuario,postData.contrasena]);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if(response.estatus == 200){
            response.model = JSON.parse(JSON.stringify(result[1][0]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}


async function actualizarPerfilUsuario(postData){
    let response = {};
    try {
        let sql = `CALL SP_ACUTALIZA_PERFIL_USUARIO(?,?,?,?,?,?,?,?,?,?,?)`;
        let result = await db.query(sql,[
             postData.usuario.idUsuario
            ,postData.nombre || null
            ,postData.cedula || null
            ,postData.cedulaEspecialidad || null
            ,postData.logo || null
            ,postData.descripcionEspecialidades || null
            ,postData.colorCotenido || null
            ,postData.colorFondoEncabezados || null
            ,postData.colorTextoDoctor || null
            ,postData.colorTituloEncabezados  || null    
            ,postData.colorFondoContenido  || null    
               
        ]);
        response = JSON.parse(JSON.stringify(result[0][0]));
        return response;
    } catch (ex) {
        throw ex;
    }
}




async function registrarPaciente(postData){
    let response = {};
    try {
       
        let sql = `CALL SP_AGREGAR_ACTUALIZAR_PACIENTE (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        let result = await db.query(sql,[
            postData.idPaciente,
            postData.nombres,
            postData.apellidoMaterno,
            postData.apellidoPaterno,
            postData.telefono,
            postData.correo,
            postData.edad,
            postData.fechaNacimiento,
            postData.usuario.idUsuario,
            postData.estadoCivil,
            postData.residencia,
            postData.escolaridad,
            postData.ocupacion,
        ]);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if(response.estatus == 200){
            response.modelo = JSON.parse(JSON.stringify(result[1][0]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}

async function actualizarEstadoUsuario(postData){
    let response = {};
    try {
        
        let sql = `CALL SP_USUARIO_ACTUALIZAR_ESTADO (?,?)`;
        let result = await db.query(sql,[
            postData.idUsuario,
            postData.estatus,
        ]);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if(response.estatus == 200){
            response.model = JSON.parse(JSON.stringify(result[1][0]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}

async function obtenerPacientes(postData){
    let response = {};
    try {
        
        let sql = `CALL SP_OBTENER_PACIENTES_RECIENTES (?)`;
        let result = await db.query(sql,[
            postData.usuario.idUsuario
        ]);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if(response.estatus == 200){
            response.modelo = JSON.parse(JSON.stringify(result[1]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}

async function guardarRespuestaHistoriaClinica(postData){
    let response = {};
    try {
        
        insert = await createGuardarRespuestaHistoriaClinica(postData);
        let result = await db.query(insert.sqlInsert);
        return responseMultiQuery(result,insert);
    } catch (ex) {
        throw ex;
    }
}

function createGuardarRespuestaHistoriaClinica(postData) {
    
    let sp = "SP_GUARDAR_RESPUESTA_X_HISTORIA_CLINICA";
    var sqlInsert = ``;
    var count = 0;

    postData.preguntas.map(x => {
        sqlInsert += `
            CALL ${sp}('${x['idRespuesta']}','${x['descripcion']}','${x['siNo']}','${postData.idPaciente}','${x['idPregunta']}');
        `;
        count++;
    });
    
    return { "sqlInsert": sqlInsert, "count": count };
};

function responseMultiQuery(result, insert) {
    let response = {};
    let insertados = 0;
    let dnEstatus = []
    for(var x in result){
        if(typeof result[x][0] === 'object'){
            var e = JSON.parse(JSON.stringify(result[x][0]));
            dnEstatus.push({"idPregunta" : e.idPregunta , "idRespuesta": e.idRespuesta , "estatus":e.estatus , "mensaje":e.mensaje})
            if(e.estatus == 200){
                insertados++;
            }
        }
    }

    if (result.length > 0) {
        response = { "modelo" : dnEstatus, "estatus": 200, "mensaje": `Se procesaron '${ insert.count }' y se insertaron con exito '${( insertados)}' registros `, "insertados": insertados, "declinados": (insert.count - insertados) };
    } else {
        response = { "modelo" : dnEstatus, "estatus": 100, "mensaje": `Error se procesaron '${ insert.count }' y se insertaron '${( insertados)}' registros` };
    }
    return response;
};


async function obtenerPreguntasRespuestasXPaciente(postData){
    let response = {};
    try {
        
        let sql = `CALL SP_OBTENER_PREGUNTAS_HISTORIA_CLINICA_X_PACIENTE (?,?)`;
        let result = await db.query(sql,[
            postData.idPaciente,
            postData.idHistoriaClinica,
        ]);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if(response.estatus == 200){
            response.modelo = JSON.parse(JSON.stringify(result[1]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}


async function obtenerPacienteXId(postData){
    let response = {};
    try {
        
        let sql = `CALL SP_OBTENER_PACIENTE_X_ID (?)`;
        let result = await db.query(sql,[
            (postData.idPaciente),
        ]);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if(response.estatus == 200){
            response.modelo = JSON.parse(JSON.stringify(result[1][0]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}


module.exports = {
    logIn
    ,registrarPaciente
    ,actualizarEstadoUsuario
    ,obtenerPacientes
    ,guardarRespuestaHistoriaClinica
    ,obtenerPreguntasRespuestasXPaciente
    ,obtenerPacienteXId
    ,actualizarPerfilUsuario
}