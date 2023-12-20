import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Municipality } from "./Municipality.js";

export const Concertation = sequelize.define(
    "concertations",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        }
       

    },
    {
        timestamps: true
    }
);

