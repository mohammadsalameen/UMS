import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../../../DB/model/user.model.js";
import   { loginSchema, registerSchema }  from "./auth.validation.js";
import validation from "../../middleware/validation.js";
import { SendEmail } from "../../../utils/SendEmail.js";
const router = Router();

//register
router.post("/register",validation(registerSchema) ,async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 8);
    await UserModel.create({ name, email, password: hashPassword });
    const html = `<div><h2>Hello ya ${name}</h2></div>`;
    await SendEmail(email, "welcome", html);
    return res.status(201).json({ message: "success"});
  } catch (err) {
    return res.status(500).json({message : "server error", err : err.stack});
  }
});

//login
router.post("/login",validation(loginSchema) ,async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
      where: { email: email },
    });
    if (user == null) {
      return res.status(404).json({ message: "Invalid email" });
    }
    const check = bcrypt.compareSync(password, user.password);
    if (check == false) {
      return res.status(404).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      "mohammad"
    );
    return res.status(200).json({ message: "success", token });
  } catch (err) {
    return res.status(500).json({message : "server error", err});
  }
});
export default router;
