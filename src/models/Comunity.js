
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Agent } from "./Agent.js";
import { Beneficiary } from "./Beneficiary.js";


export const Comunity = sequelize.define(
    "comunitys",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        holder_type: {
            type: DataTypes.ENUM,
            values: ['Comunidad', 'Persona', 'Emprendedor'],
            allowNull: false

        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            notEmpty: true,
            unique: false

        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true,
            notEmpty: true,
            unique: false

        },
        id_type: {
            type: DataTypes.ENUM,
            values: ['Cedula de Ciudadania', 'Tarjeta de Identidad', 'Cedula de Extranjeria', 'Pasaporte']

        }
        , id_number: {
            type: DataTypes.STRING,
            unique: true

        },
        genre: {
            type: DataTypes.ENUM,
            values: ['Masculino', 'Femenino'],
            allowNull: true,


        },
        phone: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: true,

        }
        ,
        email: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: true,

        },

        age: {
            type: DataTypes.INTEGER,
            unique: false,
            allowNull: true,

        },
        education_level: {
            type: DataTypes.ENUM,
            values: ['Pimaria', 'Bachiller', 'Tecnico', 'Tecnologo', 'Profesional', 'Postgrado', "Sin Formacion"],
            allowNull: true,
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



Comunity.hasMany(Beneficiary, {
    foreignKey: "comunityId",
    sourceKey: "id",
});
Beneficiary.belongsTo(Comunity, { foreignKey: "comunityId", targetId: "id" });