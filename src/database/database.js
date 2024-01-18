import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "sapvv_e0a8", // db name,
  "sapvv_e0a8_user", // username
  "V5S3ODaEVxmfd4tB3weoh6tjflmBSN1k", // password
  {
    host: process.env.DB_URL,
    dialect: "postgres",
    // pool: {
    //   max: 10,
    //   min: 0,
    //   require: 30000,
    //   idle: 10000,
    // },
    logging: true,
  }
);
