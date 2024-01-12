import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";


export const Beneficiary = sequelize.define(
    "beneficiarys",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true

        }, lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true

        }, phone: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true

        }, id_type: {
            type: DataTypes.ENUM('Cedula de Ciudadania', 'Tarjeta de Identidad', 'Cedula de Extranjeria', 'Pasaporte'),
            allowNull: false,

        }, id_number: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true


        },
    },
    {
        timestamps: true,
    },
    {
        freezeTableName: true
    }

);

