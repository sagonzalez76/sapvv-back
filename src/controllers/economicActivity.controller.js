import { EconomicActivity } from "../models/EconomicActivity.js";
import { Municipality } from "../models/Municipality.js";

export async function getEconomicActivitys(req, res) {
    try {
        const economicactivitys = await EconomicActivity.findAll({
            //TODO CON ATTRIBUTES ELEGIMOS LOS CAMPOS QUE QUEREMOS RETORNAR EN EL RES
            attributes: ["id", "name", "code"],
        });
        res.json(economicactivitys);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}



export async function createEconomicActivity(req, res) {
    const { name, code } = req.body;
    console.log(req.body);
    try {
        let newEconomicActivity = await EconomicActivity.create(
            {
                name,
                code

            },
            {
                fields: ["name", "code"],
            }
        );
        return res.json(newEconomicActivity);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
    res.json("received");
}

export async function getEconomicActivity(req, res) {
    const { id } = req.params;
    try {
        const economicactivity = await EconomicActivity.findOne({
            where: {
                id,
            },
            //TODO CON ATTRIBUTES ELEGIMOS LOS CAMPOS QUE QUEREMOS RETORNAR EN EL RES
            //EVITAMOS QUE SE ENVIE LA CONTRASENA
            attributes: ["id", "name", "code"],

        });

        res.json(economicactivity);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const updateEconomicActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, code } = req.body;
        console.log(req.body);

        const economicactivity = await EconomicActivity.findByPk(id);
        economicactivity.name = name;
        economicactivity.code = code;

        await economicactivity.save();

        res.json(economicactivity);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export async function deleteEconomicActivity(req, res) {
    const { id } = req.params;
    try {
        await EconomicActivity.destroy({
            where: {
                id,
            },
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export async function getEconomicActivityMunicipalitys(req, res) {
    const { id } = req.params;
    try {
        const municipalitys = await Municipality.findAll({
            attributes: ["id", "economicactivityId", "name"],
            where: { economicactivityId: id },
        });
        console.log(municipalitys);
        res.json(municipalitys);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}