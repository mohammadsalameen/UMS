import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import UserModel from "./user.model.js";

const BlogModel = sequelize.define('Blog',
    {
    title : {
        type : DataTypes.STRING(50),
        allowNull : false,
        unique : true
    },
    description : {
        type : DataTypes.TEXT(),
        allowNull : false,
    }
});
//Relationship
UserModel.hasMany(BlogModel);
BlogModel.belongsTo(UserModel);
export default BlogModel;