import { Router } from "express";
import UserModel from "../../../DB/model/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = Router();

router.get('/', async (req, res) =>{
    const users = await UserModel.findAll();
    return res.status(200).json({message : "success" , users})
});
//register
router.post('/', async (req, res) =>{
    const {name, email, password} = req.body;
    const hashPassword = bcrypt.hashSync(password, 8);
    await UserModel.create({name, email, password : hashPassword});

    return res.status(201).json({message : "success"});
});
//login
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({
        where : {email : email}
    });
    if(user == null){
        return res.status(404).json({message : "Invalid email"});
    }
    const check = bcrypt.compareSync(password, user.password);
    if(check == false){
        return res.status(404).json({message : "Invalid password"});
    }
    const token = jwt.sign({ id : user.id, name : user.name }, 'mohammad');
    return res.status(200).json({message : "success", token});
})
export default router;  
