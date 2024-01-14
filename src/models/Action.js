import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Evidence } from "./Evidence.js";


export const Action = sequelize.define(
    "actions",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true

        }, done: {
            type: DataTypes.BOOLEAN
        }
    },
    {
        timestamps: true,
    },
    {
        freezeTableName: true
    }

);


Action.hasMany(Evidence, {
    foreignKey: "actionId",
    sourceKey: "id",
});
Evidence.belongsTo(Action, { foreignKey: "actionId", targetId: "id" });