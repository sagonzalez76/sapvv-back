
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";



export const FinancialFounding = sequelize.define(
    "financialFoundings",
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

        }
    },
    {
        timestamps: true
    },
    {
        freezeTableName: true
    }
);
