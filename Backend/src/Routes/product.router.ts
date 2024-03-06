import {Router} from "express"
import {createProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct} from "../Controller/products.controller"
import { verifyToken } from "../Middlewares/verifyToken";

const productRouter = Router()

productRouter.post('/', createProduct)
productRouter.get('/' ,getAllProducts)
productRouter.get("/:product_id" ,getOneProduct)
productRouter.put("/:product_id" , verifyToken, updateProduct);
productRouter.delete("/:product_id" , verifyToken, deleteProduct);


export default productRouter