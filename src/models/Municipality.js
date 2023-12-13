import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Municipality = sequelize.define(
    "municipalitys",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
    },

);
