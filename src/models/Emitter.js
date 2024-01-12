import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Origin } from "./Origin.js";

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

Emitter.hasMany(Origin, {
    foreignKey: "emitterId",
    sourceKey: "id",
});
Origin.belongsTo(Emitter, { foreignKey: "emitterId", targetId: "id" });