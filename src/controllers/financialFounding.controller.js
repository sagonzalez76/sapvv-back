import { FinancialFounding } from "../models/FinancialFounding.js";
import { Municipality } from "../models/Municipality.js";

export async function getFinancialFoundings(req, res) {
    try {
        const financialfoundings = await FinancialFounding.findAll({
            //TODO CON ATTRIBUTES ELEGIMOS LOS CAMPOS QUE QUEREMOS RETORNAR EN EL RES
            attributes: ["id", "name"],
        });
        res.json(financialfoundings);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}



export async function createFinancialFounding(req, res) {
    const { name } = req.body;
    console.log(req.body);
    try {
        let newFinancialFounding = await FinancialFounding.create(
            {
                name

            },
            {
                fields: ["name"],
            }
        );
        return res.json(newFinancialFounding);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
    res.json("received");
}

export async function getFinancialFounding(req, res) {
    const { id } = req.params;
    try {
        const financialfounding = await FinancialFounding.findOne({
            where: {
                id,
            },
            //TODO CON ATTRIBUTES ELEGIMOS LOS CAMPOS QUE QUEREMOS RETORNAR EN EL RES
            //EVITAMOS QUE SE ENVIE LA CONTRASENA
            attributes: ["id", "name"],

        });

        res.json(financialfounding);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const updateFinancialFounding = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        console.log(req.body);

        const financialfounding = await FinancialFounding.findByPk(id);
        financialfounding.name = name;
        await financialfounding.save();

        res.json(financialfounding);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export async function deleteFinancialFounding(req, res) {
    const { id } = req.params;
    try {
        await FinancialFounding.destroy({
            where: {
                id,
            },
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export async function getFinancialFoundingMunicipalitys(req, res) {
    const { id } = req.params;
    try {
        const municipalitys = await Municipality.findAll({
            attributes: ["id", "financialfoundingId", "name"],
            where: { financialfoundingId: id },
        });
        console.log(municipalitys);
        res.json(municipalitys);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}