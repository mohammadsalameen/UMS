import { Router } from "express";
import auth from "../../middleware/auth.js";
import fileUpload from "../../../utils/multer.js";
import { deleteUser, getUser, updateFile } from "./user.controller.js";
const router = Router();

//get users
router.get('/', auth(), getUser);

//delete user
router.delete('/:id', auth(), deleteUser);

router.put('/:id', fileUpload().single('image'), updateFile)



export default router;  
