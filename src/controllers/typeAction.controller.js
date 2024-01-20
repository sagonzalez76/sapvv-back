import { TypeAction } from "../models/TypeAction.js";
import { Municipality } from "../models/Municipality.js";

export async function getTypeActions(req, res) {
    try {
        const typeactions = await TypeAction.findAll({
            //TODO CON ATTRIBUTES ELEGIMOS LOS CAMPOS QUE QUEREMOS RETORNAR EN EL RES
            attributes: ["id", "name"],
        });
        res.json(typeactions);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}



export async function createTypeAction(req, res) {
    const { name } = req.body;
    console.log(req.body);
    try {
        let newTypeAction = await TypeAction.create(
            {
                name

            },
            {
                fields: ["name"],
            }
        );
        return res.json(newTypeAction);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
    res.json("received");
}

export async function getTypeAction(req, res) {
    const { id } = req.params;
    try {
        const typeaction = await TypeAction.findOne({
            where: {
                id,
            },
            //TODO CON ATTRIBUTES ELEGIMOS LOS CAMPOS QUE QUEREMOS RETORNAR EN EL RES
            //EVITAMOS QUE SE ENVIE LA CONTRASENA
            attributes: ["id", "name"],

        });

        res.json(typeaction);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const updateTypeAction = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        console.log(req.body);

        const typeaction = await TypeAction.findByPk(id);
        typeaction.name = name;
        await typeaction.save();

        res.json(typeaction);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export async function deleteTypeAction(req, res) {
    const { id } = req.params;
    try {
        await TypeAction.destroy({
            where: {
                id,
            },
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export async function getTypeActionMunicipalitys(req, res) {
    const { id } = req.params;
    try {
        const municipalitys = await Municipality.findAll({
            attributes: ["id", "typeactionId", "name"],
            where: { typeactionId: id },
        });
        console.log(municipalitys);
        res.json(municipalitys);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}