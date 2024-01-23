
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";



export const Measure = sequelize.define(
    "measures",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            notEmpty: true,
            unique: false

        },
        state: {
            type: DataTypes.ENUM,
            values: ['Por Atender', 'En Atencion', 'Atendido'],
            allowNull: false

        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            notEmpty: true
        }
    },
    {
        timestamps: true
    },
    {
        freezeTableName: true
    }
);

