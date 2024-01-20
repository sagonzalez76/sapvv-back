import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "sapvv_e0a8", // nombre de la base de datos,
  "sapvv_e0a8_user", // nombre de usuario
  "V5S3ODaEVxmfd4tB3weoh6tjflmBSN1k", // contraseña
  {
    host: "postgres://sapvv_e0a8_user:V5S3ODaEVxmfd4tB3weoh6tjflmBSN1k@dpg-cmkla07109ks73eer2p0-a/sapvv_e0a8", // nombre del host
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    // pool: {
    //   max: 5,
    //   min: 0,
    //   require: 30000,
    //   idle: 10000,
    // },
    logging: false,
  }
);


// export const sequelize = new Sequelize(
//   "sapvv", // db name,
//   "postgres", // username
//   "0000", // password
//   {
//     host: "localhost",
//     dialect: "postgres",
//     // pool: {
//     //   max: 5,
//     //   min: 0,
//     //   require: 30000,
//     //   idle: 10000,
//     // },
//     logging: false,
//   }
// );
