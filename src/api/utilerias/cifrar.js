const CryptoAES = require('crypto-js/aes');
const CryptoENC = require('crypto-js/enc-utf8');
const crypto = require('crypto');
var BTOA = require('btoa');
const configGlobal = require('../../config/config');
const key = configGlobal.JWT_KEY


async function encriptarContrasenaApi(texto) {
  let encryptPass = await CryptoAES.encrypt(texto, key).toString();
  try {
    return encryptPass
  } catch (error) {
    throw error;
  }
}

async function desencriptarContrasenaApi(texto) {
  var encryptPass = await CryptoAES.decrypt(texto, key);
  var originalPass = await encryptPass.toString(CryptoENC);
  if (originalPass == '') {
    originalPass = req.body.contrasena
  }
  res.send({
    status: 200,
    password: originalPass
  })
}

async function generarContrasena(texto) {
  try {
    return await crypto.createHmac('sha256', key)
      .update(texto)
      .digest('hex');;
  } catch (error) {
    throw error;
  }

}


module.exports = {
  encriptarContrasenaApi,
  desencriptarContrasenaApi,
  generarContrasena
}