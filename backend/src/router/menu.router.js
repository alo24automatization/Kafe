import { Router } from "express";
import { menuAll, menuCreate, menuDelete, menuOne, menuUpdate } from "../controller/menu.controller.js";
import { menuCreateJoi, menuUpdateJoi } from "../validator/menu.validate.js";
import kafeAdminMiddleware from "../middleware/kafeAdmin.middleware.js";
import upload from "../utils/upload.js";
import validate from "../middleware/validate.js";

export default Router()
    .get('/all', menuAll)
    .get('/one/:id', menuOne)
    .post('/create', kafeAdminMiddleware, upload.single('image'), validate(menuCreateJoi), menuCreate)
    .put('/update/:id', kafeAdminMiddleware, upload.single('image'), validate(menuUpdateJoi), menuUpdate)
    .delete('/delete/:id', kafeAdminMiddleware, menuDelete)

