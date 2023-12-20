import { Emitter } from "../models/Emitter.js";
import { Municipality } from "../models/Municipality.js";

export async function getEmitters(req, res) {
    try {
        const emitters = await Emitter.findAll({
            //TODO CON ATTRIBUTES ELEGIMOS LOS CAMPOS QUE QUEREMOS RETORNAR EN EL RES
            attributes: ["id", "name", "phone", "address"],
        });
        res.json(emitters);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}



export async function createEmitter(req, res) {
    const { name, phone, address } = req.body;
    console.log(req.body);
    try {
        let newEmitter = await Emitter.create(
            {
                name,
                phone,
                address
            },
            {
                fields: ["name", "phone", "address"],
            }
        );
        return res.json(newEmitter);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
    res.json("received");
}

export async function getEmitter(req, res) {
    const { id } = req.params;
    try {
        const emitter = await Emitter.findOne({
            where: {
                id,
            },
            //TODO CON ATTRIBUTES ELEGIMOS LOS CAMPOS QUE QUEREMOS RETORNAR EN EL RES
            //EVITAMOS QUE SE ENVIE LA CONTRASENA
            attributes: ["id", "name", "phone", "address"],

        });

        res.json(emitter);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const updateEmitter = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, address } = req.body;
        console.log(req.body);

        const emitter = await Emitter.findByPk(id);
        emitter.name = name; 
        emitter.phone = phone;
        emitter.address = address;

        await emitter.save();

        res.json(emitter);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export async function deleteEmitter(req, res) {
    const { id } = req.params;
    try {
        await Emitter.destroy({
            where: {
                id,
            },
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


// export async function getEmitterMunicipalitys(req, res) {
//     const { id } = req.params;
//     try {
//         const municipalitys = await Municipality.findAll({
//             attributes: ["id", "emitterId", "name"],
//             where: { emitterId: id },
//         });
//         console.log(municipalitys);
//         res.json(municipalitys);
//     } catch (e) {
//         return res.status(500).json({ message: e.message });
//     }
// }