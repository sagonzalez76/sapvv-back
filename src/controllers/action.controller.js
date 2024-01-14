import { Action } from "../models/Action.js";
import { Evidence } from "../models/Evidence.js";

export async function getActions(req, res) {
    try {
        const actions = await Action.findAll({
            atributes: ["id", "description", "done"],
        });
        res.json(actions);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export async function createAction(req, res) {
    const { description, done } = req.body;
    try {
        let newAction = await Action.create(
            {
                description, done
            },
            {
                fields: ["description", "done"],
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
        const { description, done} = req.body;

        const action = await Action.findByPk(id);
        action.description = description;
        action.done = done;


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


export async function getActionEvidences(req, res) {
    
  const { id } = req.params;
  try {
    const evidences = await Evidence.findAll({
      attributes: ["id", "type"],
      where: { actionId: id },
    });
    res.json(evidences);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

