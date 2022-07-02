const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve('./', process.env.NODE_ENV + '.env')
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 3010,
    /*BD*/
    HOST_BD: process.env.HOST_BD,
    USER_BD: process.env.USER_BD,
    PASSWORD_BD: process.env.PASSWORD_BD,
    DATABASE: process.env.DATABASE,
    PORT_BD: process.env.PORT_BD,
    /*Token */
    JWT_KEY: process.env.JWT_KEY || 'Ultr4GriD_dev',
    /*API PP MVNO */
    API_PP_MVNO: process.env.API_PP_MVNO,
    /*Aws S3 */
    USER_S3: process.env.USER_S3,
    BUCKET_S3: process.env.BUCKET_S3,
    ACCESS_KEY_ID_S3: process.env.ACCESS_KEY_ID_S3,
    SECRET_ACCESS_KEY_3: process.env.SECRET_ACCESS_KEY_3
}

console.log("variables de entorno ::::", module.exports);