
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Enterprise } from "./Enterprise.js";

export const TrainingCenter = sequelize.define(
    "trainingCenters",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: DataTypes.STRING,
            allowNull: true,
            notEmpty: true,
            unique: true

        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            notEmpty: true,
            unique: false

        }
    },
    {
        timestamps: true
    },
    {
        freezeTableName: true
    }
);

// TrainingCenter.hasOne(Enterprise);
// Enterprise.belongsTo(TrainingCenter, { foreignKey: "trainingCenterId", targetKey: "id" });

// Municipality.hasMany(TrainingCenter, {
//     foreignKey: "municipalityId",
//     sourceKey: "id",
// });
// TrainingCenter.belongsTo(Municipality, { foreignKey: "municipalityId", targetId: "id" });
// YA ESTA EN MUNICIPALITY YA ESTA EN MUNICIPALITY YA ESTA EN MUNICIPALITY YA ESTA EN MUNICIPALITY YA ESTA EN MUNICIPALITY

