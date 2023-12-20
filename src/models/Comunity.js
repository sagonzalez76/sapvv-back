
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Agent } from "./Agent.js";


export const Comunity = sequelize.define(
    "comunitys",
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
    },
    {
        freezeTableName: true
    }
);

Comunity.hasMany(Agent, {
    foreignKey: "comunityId",
    sourceKey: "id",
});
Agent.belongsTo(Comunity, { foreignKey: "comunityId", targetId: "id" });