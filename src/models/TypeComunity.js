import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Comunity } from "./Comunity.js";


export const TypeComunity = sequelize.define(
    "typeComunitys",
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


TypeComunity.hasMany(Comunity, {
    foreignKey: "typeComunityId",
    sourceKey: "id",
});
Comunity.belongsTo(TypeComunity, { foreignKey: "typeComunityId", targetId: "id" });