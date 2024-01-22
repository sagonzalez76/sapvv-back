import { Regional } from "../models/Regional.js";
import { Department } from "../models/Department.js";
import { Sequelize } from "sequelize";

export async function createRegional(req, res) {
    try {
        const { name,
            // departmentId
        } = req.body;
        const newRegional = await Regional.create({
            // departmentId,
            name
        });
        res.json(newRegional);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export async function getRegionals(req, res) {
    try {
        const regionals = await Regional.findAll({
            attributes: ["id",
                "name",
                // "departmentId"
            ],
            // include: {
            //     model: Department,
            //     attributes: ["name"],
            //     where: Sequelize.literal('regionals."departmentId" = "department"."id"'),

            //     required: true
            // },
            order: [["id", "DESC"]],
        });

        res.json(regionals);
    } catch (error) {
        console.log(error);
        // return res.status(500).json({ message: error });
    }
}

export async function updateRegional(req, res) {
    const { id } = req.params;
    const { name, 
        // departmentId
     } = req.body;

    try {

        const regional = await Regional.findByPk(id);
        regional.name = name;
        // regional.departmentId = parseInt(departmentId, 10); // Convertir a entero
        await regional.save();

        res.json(regional);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function deleteRegional(req, res) {
    const { id } = req.params;
    try {
        await Regional.destroy({
            where: { id },
        });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getRegional(req, res) {
    const { id } = req.params;
    try {
        const regional = await Regional.findOne({
            where: { id },
            attributes: ["id", 
            // "departmentId", 
            "name"],
            // include: {
            //     model: Department,
            //     attributes: ["name"],
            //     where: Sequelize.literal('regionals."departmentId" = "department"."id"'),

            //     required: true
            // },
        });
        res.json(regional);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
