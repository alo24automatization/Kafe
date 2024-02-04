import { Router } from "express";
import kafeAdminMiddleware from "../middleware/kafeAdmin.middleware.js";
import upload from "../utils/upload.js";
import validate from "../middleware/validate.js";
import { productAll, productCreate, productDelete, productOne, productUpdate } from "../controller/product.controller.js";
import { productCreateJoi, productUpdateJoi } from "../validator/product.validate.js";

export default Router()
    .get('/all/:menu_id', productAll)
    .get('/one/:id', productOne)
    .post('/create', kafeAdminMiddleware, upload.single('image'), validate(productCreateJoi), productCreate)
    .put('/update/:id', kafeAdminMiddleware, upload.single('image'), validate(productUpdateJoi), productUpdate)
    .delete('/delete/:id', kafeAdminMiddleware, productDelete)
