import { User } from "../models/User.js";
export async function getUsers(req, res) {
    try {
      const projects = await User.findAll({
        atributes: ["id", "name", "rol"],
      });
      res.json(projects);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }