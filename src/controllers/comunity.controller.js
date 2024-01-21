import { Sequelize } from "sequelize";
import { ComunityMunicipality } from "../models/ComunityMunicipality.js";
import { Comunity } from "../models/Comunity.js";
import { TypeComunity } from "../models/TypeComunity.js";

import { Municipality } from "../models/Municipality.js";



export async function createComunity(req, res) {
    try {

        const { name, lastname, id_type, id_number, genre, holder_type, typeComunityId, municipalityIds, phone, email, age, education_level } = req.body;
        console.log(req.body);
        const newComunity = await Comunity.create({
            typeComunityId,
            holder_type,
            name,
            lastname,
            id_type,
            id_number,
            genre,
            phone,
            email,
            age,
            education_level
        });

        // Asocia la comunidad a los municipios a través de la tabla intermedia
        if (municipalityIds && municipalityIds.length > 0) {
            const associations = municipalityIds.map(async (municipalityId) => {
                await ComunityMunicipality.create({
                    municipalityId,
                    comunityId: newComunity.id
                });
            });
            await Promise.all(associations);
        }

        res.json(newComunity);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getComunitys(req, res) {
    try {

        const comunitys = await Comunity.findAll({
            attributes: ["id", "name", "typeComunityId", "holder_type"],
            include: { all: true, nested: true },
            where: {
                holder_type: 'Comunidad'
            },
            order: [["id", "ASC"]],
            // limit : 1
        });

        res.json(comunitys);

    } catch (error) {
        console.log('Este es el errorrrrrrrrrrrrrrrrrrrrrrr', error);
        return res.status(500).json({ message: error });
    }
}

export async function getHolders(req, res) {
    try {

        const comunitys = await Comunity.findAll({
            attributes: ["id", "name", "typeComunityId", "holder_type", "lastname", "id_type", "id_number", "genre"],
            include: { all: true, nested: true },
            where: {
                holder_type: 'Persona'
            },
            order: [["id", "ASC"]],
            limit: 1000000
        });

        res.json(comunitys);

    } catch (error) {
        console.log('Este es el errorrrrrrrrrrrrrrrrrrrrrrr', error);
        return res.status(500).json({ message: error });
    }
}



export async function getEntrepreneurs(req, res) {
    try {

        const comunitys = await Comunity.findAll({
            attributes: ["id", "name", "typeComunityId", "holder_type", "lastname", "id_type", "id_number", "genre", "phone", "email", "age", "education_level"],
            include: { all: true, nested: true },
            where: {
                holder_type: 'Emprendedor'
            },
            order: [["id", "ASC"]],
            limit: 1000000
        });

        res.json(comunitys);

    } catch (error) {
        console.log('Este es el errorrrrrrrrrrrrrrrrrrrrrrr', error);
        return res.status(500).json({ message: error });
    }
}



export async function updateComunity(req, res) {
    const { id } = req.params;
    const { name, typeComunityId, municipalityIds, lastname, id_type, id_number, genre, phone, email, age, education_level } = req.body;
    console.log(req.body);
    if (municipalityIds === undefined && !age) {

        return res.status(400).json({ message: 'Selecciona por lo menos un municipio' });
    }
    try {
        const comunity = await Comunity.findByPk(id);
        comunity.name = name;
        comunity.lastname = lastname;
        comunity.id_type = id_type;
        comunity.id_number = id_number;
        comunity.genre = genre;
        comunity.phone = phone;
        comunity.email = email;
        comunity.age = age;
        comunity.education_level = education_level;

        comunity.typeComunityId = typeComunityId  // Convertir a entero
        await comunity.save();

        // Actualizar la relación con los municipios
        await ComunityMunicipality.destroy({ where: { comunityId: id } }); // Eliminar todas las asociaciones existentes

        // Crear nuevas asociaciones
        if (municipalityIds && municipalityIds.length > 0) {
            await ComunityMunicipality.bulkCreate(municipalityIds.map(municipalityId => ({
                comunityId: id,
                municipalityId: municipalityId,
            })));
        }

        res.json(comunity);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function deleteComunity(req, res) {
    const { id } = req.params;
    try {
        await Comunity.destroy({
            where: { id },
        });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getComunity(req, res) {
    const { id } = req.params;
    try {
        const comunity = await Comunity.findOne({
            where: { id },
            attributes: ["id", "typeComunityId", "name"],
            include: { all: true, nested: false },
            order: [["id", "DESC"]],
        });
        res.json(comunity);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getHolder(req, res) {
    const { id } = req.params;
    try {
        const comunity = await Comunity.findOne({
            where: { id },
            attributes: ["id", "name", "typeComunityId", "holder_type", "lastname", "id_type", "id_number", "genre"],
            include: { all: true, nested: false },
            order: [["id", "DESC"]],
        });
        res.json(comunity);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getEntrepreneur(req, res) {
    const { id } = req.params;
    try {
        const comunity = await Comunity.findOne({
            where: { id },
            attributes: ["id", "name", "typeComunityId", "holder_type", "lastname", "id_type", "id_number", "genre", "phone", "email", "age", "education_level"],
            include: { all: true, nested: false },
            order: [["id", "DESC"]],
        });
        res.json(comunity);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}