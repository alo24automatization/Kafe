import { Router } from "express";
import { ofisiantAll, ofisiantCreate, ofisiantDelete, ofisiantOne, ofisiantUpdate } from "../controller/ofisiant.controller.js";
import { ofisiantCreateJoi, ofisiantUpdateJoi } from "../validator/ofisiant.validate.js";
import validate from "../middleware/validate.js";
import kafeAdminMiddleware from "../middleware/kafeAdmin.middleware.js";
import ofisiantMiddleware from "../middleware/ofisiant.middleware.js";
import { ofisiantToken } from "../controller/ofisiant.controller.js";

export default Router()
    .get('/all/:kafe_id', ofisiantAll)
    .get('/one/:kafe_id/:id', ofisiantOne)
    .get('/one', ofisiantMiddleware, ofisiantToken)
    .post('/create', kafeAdminMiddleware, validate(ofisiantCreateJoi), ofisiantCreate)
    .put('/update/:kafe_id/:id', kafeAdminMiddleware, validate(ofisiantUpdateJoi), ofisiantUpdate)
    .delete('/delete/:kafe_id/:id', kafeAdminMiddleware, ofisiantDelete)
