import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";


export const Commitment = sequelize.define(
    "commitments",
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
        }

    },
    {
        timestamps: true,
    },
    {
        freezeTableName: true
    }

);
