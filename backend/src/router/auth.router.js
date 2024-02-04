import { Router } from "express";
import { login } from "../controller/auth.controller.js";
import { loginJoi } from "../validator/auth.validate.js";
import validate from "../middleware/validate.js";

export default Router()
    .post('/login', validate(loginJoi), login)
