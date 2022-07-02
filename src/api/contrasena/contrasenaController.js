
const cifrar = require("../utilerias/cifrar")
const utils = require("../utilerias/utils")

async function generarContrasena(req, res) {
    try {
        const postData = req.body;
        let data ={textCifrado:' '}
        if(postData)
            data.textCifrado = await cifrar.generarContrasena(postData.texto);
        else
            data.textCifrado ='sin texto para cifrar'

        return res.status(200).json(data);
    } catch (ex) {
        res.status(500).json(utils.errorGenerico(ex));
    }
}



module.exports = {
    generarContrasena
}