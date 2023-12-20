import { Sequelize } from "sequelize";
import { ComunityMunicipality } from "../models/ComunityMunicipality.js";
import { Comunity } from "../models/Comunity.js";
import { TypeComunity } from "../models/TypeComunity.js";

import { Municipality } from "../models/Municipality.js";



export async function createComunity(req, res) {
    try {

        const { name, typeComunityId, municipalityIds } = req.body;
        console.log(req.body);
        const newComunity = await Comunity.create({
            typeComunityId,
            name
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
            attributes: ["id", "name", "typeComunityId"],
            include: { all: true, nested: true },
            order: [["id", "ASC"]],
            // limit : 1
        });
        // const formattedComunitys = comunitys.map(comunity => ({
        //     id: comunity.id,
        //     name: comunity.name,
        //     typeComunityId: comunity.typeComunityId,
        //     municipalities: comunity.ComunityMunicipalities.map(item => item.municipalities.name)
        // }));
        res.json(comunitys);

    } catch (error) {
        console.log('Este es el errorrrrrrrrrrrrrrrrrrrrrrr', error);
        return res.status(500).json({ message: error });
    }
}

export async function updateComunity(req, res) {
    const { id } = req.params;
    const { name, typeComunityId, municipalityIds } = req.body;
    
    if (municipalityIds === undefined) {
     
        return res.status(400).json({ message: 'Selecciona por lo menos un municipio' });
    }
    try {
        const comunity = await Comunity.findByPk(id);
        comunity.name = name;
        comunity.typeComunityId = parseInt(typeComunityId, 10); // Convertir a entero
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
