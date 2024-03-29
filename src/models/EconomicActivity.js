import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";



export const EconomicActivity = sequelize.define(
    "economicActivitys",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        code: {
            type: DataTypes.STRING
        }

    },
    {
        timestamps: true
    }
);

