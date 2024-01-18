import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Action } from "./Action.js";

export const Dependency = sequelize.define(
    "dependencys",
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

Dependency.hasMany(Action, {
    foreignKey: "dependencyId",
    sourceKey: "id",
});
Action.belongsTo(Dependency, { foreignKey: "dependencyId", targetId: "id" });
