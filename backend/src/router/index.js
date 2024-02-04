import { Router } from "express";
import authRouter from "./auth.router.js";
import kafeRouter from "./kafe.router.js";
import menuRouter from "./menu.router.js";
import productRouter from "./product.router.js";
import orderRouter from "./order.router.js";
import ofisiantRouter from "./ofisiant.router.js";
import zoneRouter from "./zone.router.js";
import stolRouter from "./stol.router.js";

export default Router()
    .use(authRouter)
    .use('/kafe', kafeRouter)
    .use('/menu', menuRouter)
    .use('/product', productRouter)
    .use('/order', orderRouter)
    .use('/ofisiant', ofisiantRouter)
    .use('/zone', zoneRouter)
    .use('/stol', stolRouter)
