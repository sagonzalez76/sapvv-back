import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";


export const Worksheet = sequelize.define(
    "worksheets",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        number: {
            type: DataTypes.INTEGER,
        },
        state: {
            type: DataTypes.ENUM,
            values: ['En Proceso', 'Sin Iniciar', 'Terminada']

        },

        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            isDate: true

        },

        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            isDate: true

        },
        responsible_name: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        responsible_lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        responsible_email: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        responsible_phone: {
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
