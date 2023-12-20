import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Municipality } from "./Municipality.js";

export const Emitter = sequelize.define(
    "emitters",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        }

    },
    {
        timestamps: true
    }
);

