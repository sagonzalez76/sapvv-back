import bcrypt from 'bcrypt'
import { User } from "../models/User.js";
import { tokenSign } from '../helpers/generateToken.js';
import { Role } from '../models/Role.js';
import { Sequelize } from "sequelize";

export async function signIn(req, res) {

  let { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      attributes: ["id", "name", "lastname", "email", "password", "roleId"],
      include: {
        model: Role,
        attributes: ["description"],
        where: Sequelize.literal('users."roleId" = "role"."id"'),
        required: false
      },
    });
    // console.log(user.role.description);
 
    const validation = await bcrypt.compare(password, user.password);

    if (!validation) {
      res.status(401).json({ message: 'La contraseña es incorrecta' });

    } else {
      // res.status(200).json({ message: `Hola de nuevo ${user.name} ${user.lastname} 👋` });
      const tokenSession = await tokenSign(user)

      res.send(
        {
          data: user.id,
          tokenSession
        }
      )

    }
  } catch (error) {
    res.status(401).json({ message: "El correo electronico no existe" });
    // console.log(error);
  }

}

export async function signUp(req, res) {

  let { name, lastname, email, password, roleId } = req.body;

  password = await bcrypt.hash(password, 14)

  console.log('este es el rollllllllllllllllllll', (req.body))
  try {
    let newUser = await User.create(
      {
        name,
        lastname,
        email,
        password,
        roleId
      },
      {
        fields: ["name", "lastname", "email", "password", "roleId"],
      }
    );

    return res.json(newUser);

  } catch (error) {

    if (error.errors[0].message == 'email must be unique') {
      return res.status(401).json({
        message: 'El correo electronico ya existe.',
      });
    }
    res.status(500).json({
      message: error.message,
    });
  }
  // res.json("received");
}