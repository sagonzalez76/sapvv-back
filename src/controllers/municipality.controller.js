import { Municipality } from "../models/Municipality.js";
import { Department } from "../models/Department.js";
import { Sequelize } from "sequelize";

export async function createMunicipality(req, res) {
    try {
        const { name, departmentId } = req.body;
        const newMunicipality = await Municipality.create({
            departmentId,
            name
        });
        res.json(newMunicipality);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export async function getMunicipalitys(req, res) {
    try {
        const municipalitys = await Municipality.findAll({
            attributes: ["id", "name", "departmentId"],
            include: {
                model: Department,
                attributes: ["name"],
                where: Sequelize.literal('municipalitys."departmentId" = "department"."id"'),

                required: true
            },
            order: [["id", "DESC"]],
        });

        res.json(municipalitys);
    } catch (error) {
        console.log(error);
        // return res.status(500).json({ message: error });
    }
}

export async function updateMunicipality(req, res) {
    const { id } = req.params;
    const { name, departmentId } = req.body;

    try {

        const municipality = await Municipality.findByPk(id);
        municipality.name = name;
        municipality.departmentId = parseInt(departmentId, 10); // Convertir a entero
        await municipality.save();

        res.json(municipality);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function deleteMunicipality(req, res) {
    const { id } = req.params;
    try {
        await Municipality.destroy({
            where: { id },
        });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getMunicipality(req, res) {
    const { id } = req.params;
    try {
        const municipality = await Municipality.findOne({
            where: { id },
            attributes: ["id", "departmentId", "name"],
        });
        res.json(municipality);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
