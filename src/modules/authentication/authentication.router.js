import { Router } from "express";
import   { loginSchema, registerSchema }  from "./auth.validation.js";
import validation from "../../middleware/validation.js";
import { asyncHandler } from "../../../utils/catchError.js";
import { login, register } from "./auth.controller.js";
const router = Router();
//register
router.post("/register",validation(registerSchema), asyncHandler(register));

//login
router.post("/login",validation(loginSchema) ,asyncHandler(login));
export default router;
