const notaDAO = require("../../DAO/notasMedicasDAO");
const utils = require("../utilerias/utils")

async function guardarNotaMedica(req, res) {
    try {
        const postData = req.body;
        if (Object.keys(postData).length !== 0) {
            let data = await notaDAO.guardarNotaMedica(postData);
            return res.status(200).json(data);
        } else {
            res.status(400).json(utils.postDataInvalido(postData));
        }
    } catch (ex) {
        res.status(500).json(utils.errorGenerico(ex));
    }
}

async function obteneNotasMedicas(req, res) {
    try {
        const postData = req.body;
        if (Object.keys(postData).length !== 0) {
            let data = await notaDAO.obteneNotasMedicas(postData);
            return res.status(200).json(data);
        } else {
            res.status(400).json(utils.postDataInvalido(postData));
        }
    } catch (ex) {
        res.status(500).json(utils.errorGenerico(ex));
    }
}

async function obteneNotasMedicasXId(req, res) {
    try {
        const postData = req.body;
        if (Object.keys(postData).length !== 0) {
            let data = await notaDAO.obteneNotasMedicasXId(postData);
            return res.status(200).json(data);
        } else {
            res.status(400).json(utils.postDataInvalido(postData));
        }
    } catch (ex) {
        res.status(500).json(utils.errorGenerico(ex));
    }
}

async function obtenerUltimaNotaMedicaXPaciente(req, res) {
    try {
        const postData = req.body;
        if (Object.keys(postData).length !== 0) {
            let data = await notaDAO.obtenerUltimaNotaMedicaXPaciente(postData);
            return res.status(200).json(data);
        } else {
            res.status(400).json(utils.postDataInvalido(postData));
        }
    } catch (ex) {
        res.status(500).json(utils.errorGenerico(ex));
    }
}


async function obtenerNotaMedicaXPaciente(req, res) {
    try {
        const postData = req.body;
        if (Object.keys(postData).length !== 0) {
            let data = await notaDAO.obtenerNotaMedicaXPaciente(postData);
            return res.status(200).json(data);
        } else {
            res.status(400).json(utils.postDataInvalido(postData));
        }
    } catch (ex) {
        res.status(500).json(utils.errorGenerico(ex));
    }
}


module.exports={
    guardarNotaMedica,
    obteneNotasMedicas,
    obteneNotasMedicasXId,
    obtenerUltimaNotaMedicaXPaciente,
    obtenerNotaMedicaXPaciente

}