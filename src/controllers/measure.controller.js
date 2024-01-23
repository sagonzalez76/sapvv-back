import { Sequelize } from "sequelize";
import { ComunityMeasure } from "../models/ComunityMeasure.js";
import { Measure } from "../models/Measure.js";


export async function createMeasure(req, res) {
    try {

        const { name, state, year, comunityIds, commitmentId } = req.body;
        console.log(req.body);
        const newMeasure = await Measure.create({
            name, state, year, commitmentId
        });

        // Asocia la comunidad a los municipios a través de la tabla intermedia
        if (comunityIds && comunityIds.length > 0) {
            const associations = comunityIds.map(async (comunityId) => {
                await ComunityMeasure.create({
                    comunityId,
                    measureId: newMeasure.id
                });
            });
            await Promise.all(associations);
        }

        res.json(newMeasure);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getMeasures(req, res) {
    try {

        const measures = await Measure.findAll({
            attributes: ["id", "name", "state", "year"],
            include: { all: true, nested: true },
            // where: {
            //     holder_type: 'Comunidad'
            // },
            order: [["id", "ASC"]],
            // limit : 1
        });

        res.json(measures);

    } catch (error) {
        console.log('Este es el error en Measures Front', error);
        return res.status(500).json({ message: error });
    }
}


export async function updateMeasure(req, res) {
    const { id } = req.params;
    const { name, state, year, comunityIds, commitmentId } = req.body;
    console.log(req.body);
    if (comunityIds === undefined) {

        return res.status(400).json({ message: 'Selecciona por lo menos una Comunidad, Titular o Emprendedor' });
    }
    try {
        const measure = await Measure.findByPk(id);
        measure.name = name;
        measure.state = state;
        measure.year = year;
        measure.commitmentId = commitmentId;


        await measure.save();

        // Actualizar la relación con los municipios
        await ComunityMeasure.destroy({ where: { measureId: id } }); // Eliminar todas las asociaciones existentes

        // Crear nuevas asociaciones
        if (comunityIds && comunityIds.length > 0) {
            await ComunityMeasure.bulkCreate(comunityIds.map(comunityId => ({
                measureId: id,
                comunityId: comunityId,
            })));
        }

        res.json(measure);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function deleteMeasure(req, res) {
    const { id } = req.params;
    try {
        await Measure.destroy({
            where: { id },
        });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getMeasure(req, res) {
    const { id } = req.params;
    try {
        const measure = await Measure.findOne({
            where: { id },
            attributes: ["id", "year", "name", "state"],
            include: { all: true, nested: false },
            order: [["id", "DESC"]],
        });
        res.json(measure);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
