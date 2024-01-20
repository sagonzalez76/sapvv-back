import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Action } from "./Action.js";


export const TypeAction = sequelize.define(
    "typeActions",
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
);


TypeAction.hasMany(Action, {
    foreignKey: "typeActionId",
    sourceKey: "id",
});
Action.belongsTo(TypeAction, { foreignKey: "typeActionId", targetId: "id" });