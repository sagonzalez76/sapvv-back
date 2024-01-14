// import { Program } from "../models/Program.js";
// import { Task } from "../models/Task.js";

// export async function getPrograms(req, res) {
//   try {
//     const programs = await Program.findAll({
//       atributes: ["id", "name", "priority", "description", "deliverydate"],
//     });
//     res.json(programs);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// }

// export async function createProgram(req, res) {
//   const { name, priority, description, deliveryDate } = req.body;
//   console.log(req.body);
//   try {
//     let newProgram = await Program.create(
//       {
//         name,
//         priority,
//         description,
//         deliveryDate: new Date(deliveryDate).getTime(),
//       },
//       {
//         fields: ["name", "priority", "description", "deliverydate"],
//       }
//     );
//     return res.json(newProgram);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
//   res.json("received");
// }

// export async function getProgram(req, res) {
//   const { id } = req.params;
//   try {
//     const program = await Program.findOne({
//       where: {
//         id,
//       },
//     });
//     res.json(program);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// }

// export const updateProgram = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, priority, description } = req.body;
//     console.log(req.body);

//     const program = await Program.findByPk(id);
//     program.name = name;
//     program.priority = priority;
//     program.description = description;
//     await program.save();

//     res.json(program);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// export async function deleteProgram(req, res) {
//   const { id } = req.params;
//   try {
//     await Task.destroy({
//       where: {
//         programId: id,
//       },
//     });
//     await Program.destroy({
//       where: {
//         id,
//       },
//     });
//     return res.sendStatus(204);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// }

// export async function getProgramTasks(req, res) {
//   const { id } = req.params;
//   try {
//     const tasks = await Task.findAll({
//       attributes: ["id", "programId", "name", "done"],
//       where: { programId: id },
//     });
//     res.json(tasks);
//   } catch (e) {
//     return res.status(500).json({ message: e.message });
//   }
// }
