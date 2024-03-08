import {Router} from "express"
import {checkoutCart, createCart, deleteItemCart, getCartByUserId, getOnecart, getallCarts} from "../Controller/cart.controller"
import { verifyToken } from "../Middlewares/verifyToken";

const cartRouter = Router()

cartRouter.post('/',createCart)
cartRouter.get('/' , verifyToken, getallCarts)
cartRouter.get("/userID/:user_id" , verifyToken, getCartByUserId)
cartRouter.put("/checkout/:cart_id" ,checkoutCart);
cartRouter.get("/:cart_id" , verifyToken, getOnecart)
// userRouter.put("/:user_id" , verifyToken, updateUser);
cartRouter.delete("/:cart_id" , verifyToken, deleteItemCart);


export default cartRouter