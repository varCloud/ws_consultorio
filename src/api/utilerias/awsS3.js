const config = require("../../config/config");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
    accessKeyId: config.ACCESS_KEY_ID_S3,
    secretAccessKey: config.SECRET_ACCESS_KEY_3

});


async function SaveFileS3(directoryDispersion, nameFile, file) {
    try {
        let directory = { Bucket: config.BUCKET_S3, Key: directoryDispersion }
        let fileParams = {
            Bucket: config.BUCKET_S3,
            Key: directoryDispersion + nameFile,
            Body: file,
            ACL: "public-read",
            ContentEncoding: 'base64',
            ContentType: 'application/pdf'
        };


        var existsDirectory = await ExistsDirectory(directory);
        if (existsDirectory) {
            console.log("Existe directorio");
            return await AddFile(fileParams);
        } else {
            var createDirectory = await CreateDirectory(directory);
            if (createDirectory) {
                return await AddFile(fileParams);
            }
        }
    } catch (error) {
        throw error;
    }
}
async function ExistsDirectory(directory) {
    return new Promise((resolve, reject) => {
        s3.headObject(directory, (error, data) => {
            if (!error) {
                return resolve(true);
            } else {
                if (error.code == "NotFound") return resolve(false);
                else {
                    console.log("Error al consultar directorio en Aws ", error)
                    return reject("Error al consultar directorio en Aws ")
                }
            }
        })
    });
}
async function CreateDirectory(directory) {
    return new Promise((resolve, reject) => {
        console.log("Crear directorio: ", directory)
        s3.putObject(directory, (error, data) => {
            if (error) {
                return reject("Error al crear el directorio en Aws", error)
            } else {
                console.log("se crea directorio: ", data);
                return resolve(true);
            }
        })
    });
}

async function AddFile(fileParams) {
    /*var upload = new AWS.S3.ManagedUpload({
        params: {
            Bucket: albumBucketName,
            Key: photoKey,
            Body: file,
            ACL: "public-read"
        }
    });*/
    return new Promise((resolve, reject) => {
        s3.upload(fileParams, function(err, data) {
            if (err) { console.log("***Error: ", err); return reject(`error uploading file: ${err}`) }
            console.log(`File uploaded successfully.`, data);
            return resolve({ status: 200, message: `File uploaded successfully.`, urlFile: data.Location })
        });

    });

}

async function ViewBucket() {
    return new Promise((resolve, reject) => {
        s3.listObjectsV2({ Bucket: config.BUCKET_S3 }, (error, data) => {
            if (error) return reject(error);
            else {
                console.log(data);
                return resolve(data);
            }
        })
    })
}

async function DeleteFile(key) {
    const params = { Bucket: config.BUCKET_S3, Key: key };
    return new Promise((resolve, reject) => {
        s3.deleteObject(params, (error, data) => {
            if (error) return reject(error);
            else {
                console.log(data);
                return resolve(data);
            }
        })
    })
}

module.exports = {
    SaveFileS3,
    ViewBucket,
    DeleteFile
}