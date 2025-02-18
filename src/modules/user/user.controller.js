import UserModel from "../../../DB/model/user.model.js";
import cloudinary from "../../../utils/cloudinary.js";
export const getUser = async (req, res) =>{
    const users = await UserModel.findAll({
        attributes : ['name', 'email']
    });
    // SendEmail();
    return res.status(200).json({message : "success" , users})
}

export const deleteUser = async (req, res) =>{
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

export const updateFile = async (req, res) =>{
    const {id} = req.params;
    const user = await UserModel.findByPk(id);
    if(user == null){
        return res.status(404).json({message : "user not found"})
    }
    const {secure_url} = await cloudinary.uploader.upload(req.file.path);
    user.profilePic = secure_url;
    await user.save();
    return res.status(201).json({message : "success"});
}