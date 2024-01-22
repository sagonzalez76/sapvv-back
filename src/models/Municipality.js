import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Enterprise } from "./Enterprise.js";


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

Municipality.hasMany(Enterprise, {
    foreignKey: "municipalityId",
    sourceKey: "id",
});
Enterprise.belongsTo(Municipality, { foreignKey: "municipalityId", targetKey: "id" });


