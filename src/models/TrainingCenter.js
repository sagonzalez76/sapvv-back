
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Agent } from "./Agent.js";
import { Beneficiary } from "./Beneficiary.js";


export const TrainingCenter = sequelize.define(
    "trainingCenters",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: DataTypes.STRING,
            allowNull: true,
            notEmpty: true,
            unique: true

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
