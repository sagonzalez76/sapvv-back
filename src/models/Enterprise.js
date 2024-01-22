
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { FinancialFounding } from "./financialFounding.js";
import { TrainingCenter } from "./TrainingCenter.js";
import { EconomicActivity } from "./EconomicActivity.js";

export const Enterprise = sequelize.define(
    "enterprises",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: DataTypes.STRING,
        },

        description: {
            type: DataTypes.STRING,
        },

        zone: {
            type: DataTypes.ENUM,
            values: ['Zona Urbana', 'Zona Rural']

        },

        address: {
            type: DataTypes.STRING,
        },

        economic_sector: {
            type: DataTypes.ENUM,
            values: ['Sector Agropecuario',
                'Sector Servicios',
                'Sector Industrial',
                'Sector Transporte',
                'Sector Comercio',
                'Sector Financiero',
                'Sector Construccion',
                'Sector Minero y Energetico',
                'Sector Solidario',
                'Sector Comunicaciones']
        },

        creation_date: {
            type: DataTypes.DATEONLY,
        },

        observation: {
            type: DataTypes.STRING,
        },

        month: {
            type: DataTypes.ENUM,
            values: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

        },
        type: {
            type: DataTypes.ENUM,
            values: ['Plan Negocio', 'Unidad Productiva']
        }

    },
    {
        timestamps: true,
    },
    {
        freezeTableName: true
    }

);



FinancialFounding.hasOne(Enterprise);
Enterprise.belongsTo(FinancialFounding);


TrainingCenter.hasOne(Enterprise);
Enterprise.belongsTo(TrainingCenter, { foreignKey: "trainingCenterId", targetKey: "id" });


EconomicActivity.hasOne(Enterprise);
Enterprise.belongsTo(EconomicActivity);








