import bcrypt from 'bcrypt'
import { User } from "../models/User.js";


export async function signIn(req, res) {

  let { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      attributes: ["name", "lastname", "password"]
    });

    const validation = await bcrypt.compare(password, user.password);
 
    if (!validation) {
      res.status(401).json({ message: 'La contraseña es incorrecta' });

    } else {
      res.status(200).json({ message: `Hola de nuevo ${user.name} ${user.lastname} 👋` });

    }
  } catch (error) {
    res.status(401).json({ message: "El correo electronico no existe" });
  }

}

export async function signUp(req, res) {

  let { name, lastname, email, password } = req.body;

  password = await bcrypt.hash(password, 14)

  console.log(password);
  try {
    let newUser = await User.create(
      {
        name,
        lastname,
        email,
        password
      },
      {
        fields: ["name", "lastname", "email", "password"],
      }
    );

    return res.json(newUser);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
  // res.json("received");
}