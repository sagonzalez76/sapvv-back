import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Program = sequelize.define(
    "programs",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        }

    },
    {
        timestamps: true
    }
)