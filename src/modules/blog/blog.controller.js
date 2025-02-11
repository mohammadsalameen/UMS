import BlogModel from "../../../DB/model/blog.model.js";
import UserModel from "../../../DB/model/user.model.js";
import { AppError } from "../../../utils/AppError.js";

export const getBlog = async(req, res) =>{
    const blogs = await BlogModel.findAll({
        attributes : ['id', 'title'],
        include : {
            model : UserModel,
            attributes : ['id', 'name']
        }
    });
    return res.status(200).json({message : "success", blogs});
}

export const createBlog =  async(req, res) =>{
    const {title, description} = req.body;
    const blog = await BlogModel.create({title, description, UserId : req.id});

    return res.status(201).json({message : "success", blog});
}

export const getDetails = async(req, res, next) =>{
    const {id} = req.params;
    const blog = await BlogModel.findByPk(id);
    if(blog == null){
        return next(new AppError("Blog not found", 404));
    }
    return res.status(200).json({message : "success", blog});
}