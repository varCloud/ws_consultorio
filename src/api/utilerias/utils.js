const winston = require("../../config/winston");
const pathDestino = "src/imgs/eventos";
const pathImagenDefault = "src/imgs/eventos/default.jpg";
const db = require("../../config/database");
const CryptoAES = require('crypto-js/aes');
const CryptoENC = require('crypto-js/enc-utf8');
const crypto = require('crypto');
const fs = require('fs');
var appRoot = require('app-root-path');

function postDataInvalido(postData) {
    return {
        status: -1,
        message: "Por favor revisa el parametro de entrada.",
        error: postData
    }
}

function errorGenerico(ex) {
    winston.error(ex);
    return {
        status: -1,
        message: "Ocurrio un error interno, por favor contactar a soporte tecnico.",
        error: ex.message+' '+ex.stack
    }
}

function setFormatDateToDDmmYYYY(date) {
    var date_ = new Date(date);
    if (date.includes(",")) {
        date_ = date.split(",")[0].split("/");
        return `${(date_[1].length == 1 ? "0" + date_[1] : date_[1])}-${(date_[0].length == 1 ? +"0" + date_[0] : date_[0])}-${date_[2]}`
    } else {
        var date_ = (date_.getUTCDate() < 10 ? '0' + date_.getUTCDate() : date_.getUTCDate()) +
            '-' + ((date_.getMonth() + 1) < 10 ? '0' + (date_.getMonth() + 1) : (date_.getMonth() + 1)) +
            '-' + date_.getFullYear();
    }
    return date_;
}


async function writeTXT(name, path, content) {
    let pathfile = appRoot + '/' + path + '/' + name
    let response = { estatus: 200, path: pathfile }
    try {
        fs.writeFileSync(pathfile, content);
    } catch (err) {
        response.estatus = -1
        response.error = err
    }

    return response;
}

function convertBase64ToS3(base64String) {
    let buf = Buffer.from(base64String.split(',')[1], 'base64')
    return buf;
}

module.exports = {
    postDataInvalido,
    errorGenerico,

    writeTXT,
    convertBase64ToS3,
    setFormatDateToDDmmYYYY
}