module.exports = {
    apps : [{
      name   : "ws-consultorio",
      script : "./src/app.js",
      env_production: {
        NODE_ENV: "production",
        PORT:3020,
        HOST_BD: 'MYSQL5046.site4now.net',
        USER_BD: 'a57e86_consult',
        PASSWORD_BD: 'Abcde12345',
        DATABASE: 'db_a57e86_consult',
        PORT_BD : 3306,
        JWT_KEY : 'BlueCloud',
        USER_S3 : 'pp_empresas',
        BUCKET_S3 : 'empresas-production',
        ACCESS_KEY_ID_S3 : 'AKIAZOKOEYUUH7DCMOR6',
        SECRET_ACCESS_KEY_3 : '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'

      },
      env_development: {
         NODE_ENV: "development"
      }
    }]
  }