const winston = require("../../config/winston");
var jwt = require('jsonwebtoken')
const configGlobal = require('../../config/config');
var jwtClave = configGlobal.JWT_KEY;

var jwtTiempoToken = 60 * 60 * 24; // expires in 24 hours

function generateTokenUser(user) {
    try {
        var token = jwt.sign(user, jwtClave, {
            expiresIn: jwtTiempoToken
        })
        return token;
    }
    catch (err) {
        throw err;
    }
}


function validateToken(request, response,next) {
    winston.info("Token: " + request.headers['authorization-pp']);
    var token = request.headers['authorization-pp']
    var result = { estatus: -1, mensaje: " " }
    if (!token) {
        result.mensaje = "Authentication token is required."
        return response.status(401).json(result);
    }
    if (!token.includes("Bearer-PP")) {
        result.mensaje = "Authentication bearer is required."
        return response.status(401).json(result);
    }
    token = token.replace('Bearer-PP ', '')
    jwt.verify(token, jwtClave, function (err, user) {
        if (err) {
            result.mensaje = "Invalid Token.";
            return response.status(401).json(result);
        } else {
            result.mensaje = "Valid Token."
            result.estatus = 200;
            request.body.usuario= user;
        }
    });
    return next();
}

module.exports = {
    generateTokenUser,
    validateToken
}