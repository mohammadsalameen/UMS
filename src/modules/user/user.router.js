import { Router } from "express";
import UserModel from "../../../DB/model/user.model.js";
import auth from "../../middleware/auth.js";
import { SendEmail } from "../../../utils/SendEmail.js";
import fileUpload from "../../../utils/multer.js";
import cloudinary from "../../../utils/cloudinary.js";
const router = Router();

//get users
router.get('/', auth() ,async (req, res) =>{
        const users = await UserModel.findAll({
            attributes : ['name', 'email']
        });
        // SendEmail();
        return res.status(200).json({message : "success" , users})

});

//delete user
router.delete('/:id',auth() ,async (req, res) =>{
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
});

router.put('/:id', fileUpload().single('image'), async (req, res) =>{
    const {id} = req.params;
    const user = await UserModel.findByPk(id);
    if(user == null){
        return res.status(404).json({message : "user not found"})
    }
    const {secure_url} = await cloudinary.uploader.upload(req.file.path);
    user.profilePic = secure_url;
    await user.save();
    return res.status(201).json({message : "success"});
})



export default router;  
