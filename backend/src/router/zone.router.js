import { Router } from "express";
import { zoneAll, zoneCreate, zoneDelete, zoneUpdate } from "../controller/zone.controller.js";
import { zoneCreateJoi, zoneUpdateJoi } from "../validator/zone.validate.js";
import validate from "../middleware/validate.js";
import kafeAdminMiddleware from "../middleware/kafeAdmin.middleware.js";

export default Router()
    .get('/all/:kafe_id', zoneAll)
    .post('/create', kafeAdminMiddleware, validate(zoneCreateJoi), zoneCreate)
    .put('/update/:kafe_id/:id', kafeAdminMiddleware, validate(zoneUpdateJoi), zoneUpdate)
    .delete('/delete/:kafe_id/:id', kafeAdminMiddleware, zoneDelete)
