import { Action } from "../models/Action.js";
import { Dependency } from "../models/Dependency.js";
import { Evidence } from "../models/Evidence.js";
import { Sequelize } from "sequelize";


export async function getActions(req, res) {
    try {
        const actions = await Action.findAll({
            atributes: ["id", "description", "done"],
            include: { all: true, nested: true },
            
             
        });
        res.json(actions);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export async function createAction(req, res) {
    const { description, done, dependencyId, typeActionId, measureId } = req.body;
    try {
        let newAction = await Action.create(
            {
                description, done, dependencyId, typeActionId, measureId
            },
            {
                fields: ["description", "done", "dependencyId", "typeActionId", "measureId"],
            }
        );
        return res.json(newAction);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
    res.json("received");
}

export async function getAction(req, res) {
    const { id } = req.params;
    try {
        const action = await Action.findOne({
            where: {
                id,
            },
        });
        res.json(action);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const updateAction = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, done, dependencyId, typeActionId, measureId  } = req.body;

        const action = await Action.findByPk(id);
        action.description = description;
        action.done = done;
        action.dependencyId = dependencyId;
        action.typeActionId = typeActionId;
        action.measureId = measureId;



        await action.save();

        res.json(action);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export async function deleteAction(req, res) {
    const { id } = req.params;
    try {

        await Action.destroy({
            where: {
                id,
            },
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// export async function getActionEvidences(req, res) {
//     const { id } = req.params;

//     try {
//         const evidences = await Evidence.findAll({
//             attributes: ["id", "type", "url", "name"],
//             where: {
//                 actionId: id,
//                 [Sequelize.Op.and]: [
//                     Sequelize.literal(`"evidences"."type"::text LIKE 'image%'`),
//                 ],
//             },
//         });
//         res.json(evidences);
//     } catch (e) {
//         return res.status(500).json({ message: e.message });
//     }


// }


export async function getImageEvidences(req, res) {
    const { id } = req.params;

    try {
        const evidences = await Evidence.findAll({
            attributes: ["id", "type", "url", "name", "createdAt"],
            where: {
                actionId: id,
                [Sequelize.Op.and]: [
                    Sequelize.literal(`"evidences"."type"::text LIKE 'image%'`),
                ],
            },
        });
        res.json(evidences);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }


}

export async function getVideoEvidences(req, res) {
    const { id } = req.params;

    try {
        const evidences = await Evidence.findAll({
            attributes: ["id", "type", "url", "name", "createdAt"],
            where: {
                actionId: id,
                [Sequelize.Op.and]: [
                    Sequelize.literal(`"evidences"."type"::text LIKE 'video%'`),
                ],
            },
        });
        res.json(evidences);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}


export async function getAudioEvidences(req, res) {
    const { id } = req.params;

    try {
        const evidences = await Evidence.findAll({
            attributes: ["id", "type", "url", "name", "createdAt"],
            where: {
                actionId: id,
                [Sequelize.Op.and]: [
                    Sequelize.literal(`"evidences"."type"::text LIKE 'audio%'`),
                ],
            },
        });
        res.json(evidences);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}
export async function getDocumentEvidences(req, res) {
    const { id } = req.params;

    try {
        const evidences = await Evidence.findAll({
            attributes: ["id", "type", "url", "name", "createdAt"],
            where: {
                actionId: id,
                [Sequelize.Op.and]: [
                    Sequelize.literal(`"evidences"."type"::text LIKE 'application%'`),
                ],
            },
        });
        res.json(evidences);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}



