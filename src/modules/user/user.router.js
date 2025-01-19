import { Router } from "express";
import UserModel from "../../../DB/model/user.model.js";
import jwt from 'jsonwebtoken';
const router = Router();

//get users
router.get('/', async (req, res) =>{
    const decoded = jwt.verify(token, 'mohammad');
    if(decoded.role != 'admin'){
        return res.status(400).json({message : "not authorized"})
    }
    const users = await UserModel.findAll({
        attributes : ['name', 'email']
    });
    return res.status(200).json({message : "success" , users})
});

//delete user
router.delete('/:id', async (req, res) =>{
    const {id} = req.params;

    const {token} = req.headers;
    const decoded = jwt.verify(token, 'mohammad');
    if(decoded.role != 'admin'){
        return res.status(400).json({message : "not authorized"})
    }
    const user = await UserModel.findByPk(id);
    if(user == null){
        return res.status(404).json({message : "user not found"})
    }
    await UserModel.destroy({
        where : {
            id : id
        }
    });
    return res.status(200).json({message : "success"});
});


export default router;  
