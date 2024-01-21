import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { TrainingCenter } from "./TrainingCenter.js";

export const Municipality = sequelize.define(
    "municipalitys",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        }
    },
    {
        timestamps: true,
    },
    {
        freezeTableName: true
    }

);

Municipality.hasMany(TrainingCenter, {
    foreignKey: "municipalityId",
    sourceKey: "id",
});
TrainingCenter.belongsTo(Municipality, { foreignKey: "municipalityId", targetId: "id" });