import { Router } from "express";
import { stolActiveCode, stolCreateJoi, stolUpdateJoi } from "../validator/stol.validate.js";
import {
    stolActivate,
    stolAll,
    stolCreate,
    stolDelete,
    stolNoActivate,
    stolOfisiant,
    stolZone,
    stolActive,
    stolUpdate,
    stolActivateCode
} from "../controller/stol.controller.js";
import validate from "../middleware/validate.js";
import kafeAdminMiddleware from "../middleware/kafeAdmin.middleware.js";
import ofisiantMiddleware from "../middleware/ofisiant.middleware.js";

export default Router()
    .get('/all/:kafe_id', stolAll)
    .get('/:kafe_id/ofisiant/:ofisiant_id', stolOfisiant)
    .get('/:kafe_id/zone/:zone_id', stolZone)
    .get('/:kafe_id/active/:ofisiant_id', stolActive)
    .post('/create', kafeAdminMiddleware, validate(stolCreateJoi), stolCreate)
    .post('/login/:kafe_id/:id', validate(stolActiveCode), stolActivateCode)
    .put('/update/:kafe_id/admin/:id', kafeAdminMiddleware, validate(stolUpdateJoi), stolUpdate)
    .put('/update/:kafe_id/activate/:id', ofisiantMiddleware, stolActivate)
    .put('/update/:kafe_id/no_activate/:id', ofisiantMiddleware, stolNoActivate)
    .delete('/delete/:kafe_id/:id', kafeAdminMiddleware, stolDelete)
