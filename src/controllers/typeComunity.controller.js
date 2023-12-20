import { TypeComunity } from "../models/TypeComunity.js";
import { Municipality } from "../models/Municipality.js";

export async function getTypeComunitys(req, res) {
    try {
        const typecomunitys = await TypeComunity.findAll({
            //TODO CON ATTRIBUTES ELEGIMOS LOS CAMPOS QUE QUEREMOS RETORNAR EN EL RES
            attributes: ["id", "name"],
        });
        res.json(typecomunitys);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}



export async function createTypeComunity(req, res) {
    const { name } = req.body;
    console.log(req.body);
    try {
        let newTypeComunity = await TypeComunity.create(
            {
                name

            },
            {
                fields: ["name"],
            }
        );
        return res.json(newTypeComunity);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
    res.json("received");
}

export async function getTypeComunity(req, res) {
    const { id } = req.params;
    try {
        const typecomunity = await TypeComunity.findOne({
            where: {
                id,
            },
            //TODO CON ATTRIBUTES ELEGIMOS LOS CAMPOS QUE QUEREMOS RETORNAR EN EL RES
            //EVITAMOS QUE SE ENVIE LA CONTRASENA
            attributes: ["id", "name"],

        });

        res.json(typecomunity);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const updateTypeComunity = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        console.log(req.body);

        const typecomunity = await TypeComunity.findByPk(id);
        typecomunity.name = name;
        await typecomunity.save();

        res.json(typecomunity);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export async function deleteTypeComunity(req, res) {
    const { id } = req.params;
    try {
        await TypeComunity.destroy({
            where: {
                id,
            },
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export async function getTypeComunityMunicipalitys(req, res) {
    const { id } = req.params;
    try {
        const municipalitys = await Municipality.findAll({
            attributes: ["id", "typecomunityId", "name"],
            where: { typecomunityId: id },
        });
        console.log(municipalitys);
        res.json(municipalitys);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}