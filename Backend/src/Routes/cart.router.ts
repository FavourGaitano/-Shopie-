import {Router} from "express"
import {checkoutCart, createCart, deleteItemCart, getCartByUserId, getallCarts} from "../Controller/cart.controller"
import { verifyToken } from "../Middlewares/verifyToken";

const cartRouter = Router()

cartRouter.post('/',verifyToken, createCart)
cartRouter.get('/' , verifyToken, getallCarts)
cartRouter.get("/userID/:user_id" , verifyToken, getCartByUserId)
cartRouter.put("/checkout/:cart_id" , verifyToken, checkoutCart);
// userRouter.get("/:user_id" , verifyToken, getOneUser)
// userRouter.put("/:user_id" , verifyToken, updateUser);
cartRouter.delete("/:cart_id" , verifyToken, deleteItemCart);


export default cartRouter