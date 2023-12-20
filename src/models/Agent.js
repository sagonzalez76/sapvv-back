import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";


export const Agent = sequelize.define(
    "agents",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        }, lastname: {
            type: DataTypes.STRING,
        }, phone: {
            type: DataTypes.STRING,
        }, id_type: {
            type: DataTypes.ENUM('Cedula de Ciudadania', 'Tarjeta de Identidad', 'Cedula de Extranjeria', 'Pasaporte'),
        }, id_number: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
    },
    {
        freezeTableName: true
    }

);

