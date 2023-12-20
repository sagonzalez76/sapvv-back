import { User } from "../models/User.js";
import { Role } from "../models/Role.js";
import {Sequelize} from "sequelize";

export async function getUsers(req, res) {
  try {
    const users = await User.findAll({
      //TODO CON ATTRIBUTES ELEGIMOS LOS CAMPOS QUE QUEREMOS RETORNAR EN EL RES
      attributes: ["id", "name", "lastname", "email", "roleId", "password"],
      include: {
        model: Role,
        attributes: ["description"],
        where: Sequelize.literal('users."roleId" = "role"."id"'),
        required: false
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}



// export async function createUser(req, res) {
//   const { name, lastname, email, role, password } = req.body;
//   console.log(req.body);
//   try {
//     let newUser = await User.create(
//       {
//         name,
//         lastname,
//         email,
//         password,
//         role
//       },
//       {
//         fields: ["name", "lastname", "email", "role", "password"],
//       }
//     );
//     return res.json(newUser);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
//   res.json("received");
// }

export async function getUser(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id,
      },
      //TODO CON ATTRIBUTES ELEGIMOS LOS CAMPOS QUE QUEREMOS RETORNAR EN EL RES
      //EVITAMOS QUE SE ENVIE LA CONTRASENA
      attributes: ["id", "name", "lastname", "email", "roleId"],
      include: {
        model: Role,
        attributes: ["description"],
        where: Sequelize.literal('users."roleId" = "role"."id"'),
        required: false
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, email,  roleId } = req.body;
    console.log(req.body);

    const user = await User.findByPk(id);
    user.name = name;
    user.lastname = lastname;
    user.email = email;
    user.roleId = roleId;
    await user.save();

    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    await User.destroy({
      where: {
        id,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}