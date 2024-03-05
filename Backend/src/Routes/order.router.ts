import {Router} from "express"
import { cancelOrder, changeStatus, createOrder, getAllOrders, getOrderByUserId } from "../Controller/order.controller"
import { verifyToken } from "../Middlewares/verifyToken";

const orderRouter = Router()

orderRouter.post('/', createOrder)
orderRouter.get('/' , verifyToken ,getAllOrders)
orderRouter.get("/userID/:user_id" , verifyToken, getOrderByUserId)
orderRouter.delete("/:order_id" , verifyToken, cancelOrder);
orderRouter.post("/:order_id" , verifyToken, changeStatus);


export default orderRouter



