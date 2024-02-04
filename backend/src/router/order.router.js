import { Router } from "express";
import { orderCreateJoi, orderUpdateJoi } from "../validator/order.validate.js";
import { orderAll, orderCreate, orderDelete, orderUpdate } from "../controller/order.controller.js";
import validate from "../middleware/validate.js";
import stolMiddleware from "../middleware/stol.middleware.js";

export default Router()
    .get('/all', stolMiddleware, orderAll)
    .post('/create', stolMiddleware, validate(orderCreateJoi), orderCreate)
    .put('/update/:id', stolMiddleware, validate(orderUpdateJoi), orderUpdate)
    .delete('/delete/:id', stolMiddleware, orderDelete)
