import UserModel from "../../../DB/model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SendEmail } from "../../../utils/SendEmail.js";
import { AppError } from "../../../utils/AppError.js";
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 8);
    await UserModel.create({ name, email, password: hashPassword });
    // const html = `<div><h2>Hello ya ${name}</h2></div>`;
    // await SendEmail(email, "welcome", html);
    return res.status(201).json({ message: "success" });

}
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
      where: { email: email },
    });
    if (user == null) {
    //   return res.status(404).json({ message: "Invalid email" });
    return next(new AppError("invalid email", 404));
    }
    const check = bcrypt.compareSync(password, user.password);
    if (check == false) {
    //   return res.status(404).json({ message: "Invalid password" });
    return next(new AppError("invalid password", 404));
    }
    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      "mohammad"
    );
    return res.status(200).json({ message: "success", token });
}