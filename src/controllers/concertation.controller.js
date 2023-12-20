import { Concertation } from "../models/Concertation.js";
import { Municipality } from "../models/Municipality.js";

export async function getConcertations(req, res) {
    try {
        const concertations = await Concertation.findAll({
            //TODO CON ATTRIBUTES ELEGIMOS LOS CAMPOS QUE QUEREMOS RETORNAR EN EL RES
            attributes: ["id", "name", "description"],
        });
        res.json(concertations);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}



export async function createConcertation(req, res) {
    const { name, description } = req.body;
    console.log(req.body);
    try {
        let newConcertation = await Concertation.create(
            {
                name,
                description
            },
            {
                fields: ["name", "description"],
            }
        );
        return res.json(newConcertation);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
    res.json("received");
}

export async function getConcertation(req, res) {
    const { id } = req.params;
    try {
        const concertation = await Concertation.findOne({
            where: {
                id,
            },
            //TODO CON ATTRIBUTES ELEGIMOS LOS CAMPOS QUE QUEREMOS RETORNAR EN EL RES
            //EVITAMOS QUE SE ENVIE LA CONTRASENA
            attributes: ["id", "name", "description"],

        });

        res.json(concertation);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const updateConcertation = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        console.log(req.body);

        const concertation = await Concertation.findByPk(id);
        concertation.name = name; 
        concertation.description = description;
        await concertation.save();

        res.json(concertation);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export async function deleteConcertation(req, res) {
    const { id } = req.params;
    try {
        await Concertation.destroy({
            where: {
                id,
            },
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


// export async function getConcertationMunicipalitys(req, res) {
//     const { id } = req.params;
//     try {
//         const municipalitys = await Municipality.findAll({
//             attributes: ["id", "concertationId", "name"],
//             where: { concertationId: id },
//         });
//         console.log(municipalitys);
//         res.json(municipalitys);
//     } catch (e) {
//         return res.status(500).json({ message: e.message });
//     }
// }