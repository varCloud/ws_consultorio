var nodemailer = require('nodemailer');
const db = require("../../config/database");
const utils = require("../utilerias/utils")

var transporter = nodemailer.createTransport({
    //service: 'Gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'soporte@pagaphone.com', //'admin@pagaphone.com',
        pass: 'bmlvqchxnpjurtjm' //'Mini241216_admin'//'wwebfqbswavslomq'
    }
});

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

var from = "soporte@pagaphone.com"

const EmailReportType = {
    layoutCustomerPayment: 5,
    layoutCustomerPaymentDelete: 7
}

//#region Reports
async function sendMailReport(emailReportType, data, attachments = undefined) {

    var body = "";
    var template = await getTemplateMail({ idReport: emailReportType, error: data.error });
    if (template.status != 200)
        console.log("****No se encontro la plantilla de correo electronico");
    else {
        if (data.error == 1) {
            body = replaceEmailError(template.modelo.templateEmail, data)
        } else {
            switch (emailReportType) {
                case EmailReportType.layoutCustomerPayment:
                    body = replaceLayoutCustomerPayment(template.modelo.templateEmail, data);
                    break;
                case EmailReportType.layoutCustomerPaymentDelete:
                    body = replaceLayoutCustomerPaymentDelete(template.modelo.templateEmail, data);
                    break;
            }
        }
        var mailOptions = {
            from: from,
            to: data.toSend,
            subject: data.asunto,
            cc: data.toSendCC,
            html: body,
            attachments: attachments
        };
        try {
            sendEmail(mailOptions);
        } catch (error) {
            console.log(error);
        }

    }
}

function replaceLayoutCustomerPayment(template, data) {
    var body = template || "";
    body = body.replace(/\r\n/g, "")
    body = body.replace(/@asunto@/g, data.asunto)
    body = body.replace(/@Titulo@/g, data.titulo)
    body = body.replace(/@fechaOperacion@/g, utils.setFormatDateToDDmmYYYY(data.registrationDate))
    body = body.replace(/@beneficiario@/g, data.customerName)
    body = body.replace(/@montoAnterior@/g, formatter.format(data.previousBalance) || 0)
    body = body.replace(/@montoAbonado@/g, formatter.format(data.amount) || 0)
    body = body.replace(/@SaldoActual@/g, formatter.format(data.currentBalance) || 0)
    body = body.replace(/@tipoAbono@/g, data.paymentType)
    body = body.replace(/@realizo@/g, data.webUser)
    body = body.replace(/@folio@/g, data.idCustomerPayment)

    return body;
}

function replaceLayoutCustomerPaymentDelete(template, data) {
    var body = template || "";
    body = body.replace(/\r\n/g, "")
    body = body.replace(/@asunto@/g, data.asunto)
    body = body.replace(/@Titulo@/g, data.titulo)

    body = body.replace(/@observations@/g, data.observations)
    body = body.replace(/@fechaOperacion@/g, utils.setFormatDateToDDmmYYYY(data.registrationDate))
    body = body.replace(/@beneficiario@/g, data.customerName)
    body = body.replace(/@montoAnterior@/g, formatter.format(data.previousBalance) || 0)
    body = body.replace(/@montoAbonado@/g, formatter.format(data.amount) || 0)
    body = body.replace(/@SaldoActual@/g, formatter.format(data.currentBalance) || 0)
    body = body.replace(/@tipoAbono@/g, data.paymentType)
    body = body.replace(/@realizo@/g, data.webUser)
    body = body.replace(/@folio@/g, data.idCustomerPayment)

    return body;
}

//#region Funciones Privadas
async function getTemplateMail(postData) {
    try {
        let sql = `CALL PP_SP_GET_REPORTS_EMAIL_TEMPLATE (?,?)`;
        let result = await db.query(sql, [
            postData.idReport,
            postData.error || 0
        ]);
        let response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.status == 200) {
            response.modelo = JSON.parse(JSON.stringify(result[1][0]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}

function sendEmail(mailOptions) {
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log("error send email: ", error)
            return false;
        } else {
            console.log("email send")
            return true;
        }
    });
}
//#endregion Funciones Privadas

module.exports = {
    sendEmail,
    EmailReportType,
    sendMailReport
}