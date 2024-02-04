import { Router } from "express";
import { kafeCreateJoi, kafeUpdateJoi } from "../validator/kafe.validate.js";
import validate from "../middleware/validate.js";
import upload from "../utils/upload.js";
import superAdminMiddleware from "../middleware/superAdmin.middleware.js";
import { kafeAll, kafeCreate, kafeDelete, kafeOne, kafeUpdate } from "../controller/kafe.controller.js";

export default Router()
    .get('/all', kafeAll)
    .get('/one/:id', kafeOne)
    .post('/create', superAdminMiddleware, upload.single('logo'), validate(kafeCreateJoi), kafeCreate)
    .put('/update/:id', superAdminMiddleware, upload.single('logo'), validate(kafeUpdateJoi), kafeUpdate)
    .delete('/delete/:id', superAdminMiddleware, kafeDelete)
