import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../../../DB/model/user.model.js";
import   { loginSchema, registerSchema }  from "./auth.validation.js";
const router = Router();
//register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = registerSchema.validate({name, email, password});
    if(result.error){
        return res.status(400).json({message : "validation error", error : result.error});
    }
    const hashPassword = bcrypt.hashSync(password, 8);
    await UserModel.create({ name, email, password: hashPassword });

    return res.status(201).json({ message: "success" });
  } catch (err) {
    return res.status(500).json("server error", err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = loginSchema.validate({email, password});
    if(result.error){
        return res.status(400).json({message : "validation error", error : result.error});
    }
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
    return res.status(500).json("server error", err);
  }
});
export default router;
