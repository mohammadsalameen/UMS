import { Router } from "express";
import UserModel from "../../../DB/model/user.model.js";
import auth from "../../middleware/auth.js";
import { SendEmail } from "../../../utils/SendEmail.js";
const router = Router();

//get users
router.get('/', auth() ,async (req, res) =>{
    try{
        const users = await UserModel.findAll({
            attributes : ['name', 'email']
        });
        // SendEmail();
        return res.status(200).json({message : "success" , users})
    }
    catch(err){
        return res.status(500).json({message : "server error", err});
    }
});

//delete user
router.delete('/:id',auth() ,async (req, res) =>{
    try{
        const {id} = req.params;
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
    }
    catch(err){
        return res.status(500).json({message : "server error", err});
    }
});



export default router;  
