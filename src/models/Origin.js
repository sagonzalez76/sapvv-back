import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Commitment } from "./Commitment.js";


export const Origin = sequelize.define(
    "origins",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.ENUM,
            values: ['Concertacion', 'Alerta Temprana', 'Muto Propio', 'Sentencia', 'Auto', 'Otro Tipo']

        },
        filing: {
            type: DataTypes.STRING,
            allowNull: true,
            notEmpty: true,
            unique: true
        },

        origin_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            isDate: true

        },

        notification_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            isDate: true

        }

    },
    {
        timestamps: true,
    },
    {
        freezeTableName: true
    }

);
Origin.hasMany(Commitment, {
    foreignKey: "originId",
    sourceKey: "id",
});
Commitment.belongsTo(Origin, { foreignKey: "originId", targetId: "id" });
