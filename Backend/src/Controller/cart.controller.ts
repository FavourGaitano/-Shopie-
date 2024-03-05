import { Request, Response } from "express";
import {v4} from 'uuid'
import {Cart } from "../Interface/cart.interface";
import mssql from 'mssql';
import bcrypt from 'bcrypt'
import { sqlConfig } from '../Config/sql.Config';
import Connection from '../DbHelper/dbhelper';




////check if cart exists then create cart
export const createCart = async (req: Request, res: Response) => {
  try {
    let id = v4();
    console.log("Cart:", id);
    const {user_id, product_id, total_price, quantity}: Cart = req.body;

    console.log(req.body);


    const pool = await mssql.connect(sqlConfig);

    // checking  if cart already  exists in the database by its user id
    const result = await pool
      .request()
      .input('user_id', mssql.VarChar, user_id)
      .execute("CheckCartExists")

      console.log("Your result",result.recordset.length);

      if(result.recordset.length >=1){
        const addProductToCart = await pool
        .request()
        .input('cart_id', mssql.VarChar, result.recordset[0].cart_id) 
        .input('product_id', mssql.VarChar, product_id)
        .input('quantity', mssql.Int, quantity)
        
        .execute('addProductToCart');

        console.log(addProductToCart);
        return res.status(200).json({ message: "Product added to cart successfully." });

     
      }else { 
              const createCart = (
                await pool
                  .request()
                .input('cart_id', mssql.VarChar, id)
                .input('product_id', mssql.VarChar, product_id)
                .input('user_id', mssql.VarChar, user_id)
                .input('total_price', mssql.Numeric, total_price)
                .execute('createCart')).rowsAffected;
             

              console.log(createCart);
              return res.status(201).json
                ({message: "Cart created succesfully."});
        };
        } catch (err) {
          console.log(err);
    return res.sendStatus(500).json({ message: err });
    }
};

//Dbhelper get all carts
export const getallCarts = async(req:Request, res: Response)=>{
    try {


        let carts = (await Connection.execute("getallCarts")).recordset
        

        if(carts.length > 0){
            return res.json({
                carts
            })
        }else{
            return res.json({
                message: "No carts found"
            })
        }
        
    } catch (error:any) {
        return res.json({
            error: error.originalError.info.message
        })
    }
}

//Dbhelper get cart by user_id

export const getCartByUserId = async (req: Request, res: Response) => {
  try {
      const user_id = req.params.user_id;
      console.log("User ID:", user_id);

      let cartDetails = (await Connection.execute("getCartByUserId", { user_id: user_id })).recordset;

      
      if (cartDetails.length === 0) {
         
          return res.status(200).json({ message: "Your cart is empty." });
      }

     
      return res.json({ cartDetails });
  } catch (error) {
      console.log("Error in getting data from database", error);
      return res.status(400).json({ message: "There was an issue retrieving the cart." });
  }
};

//Dbhelper for when user checksoutcart
export const checkoutCart = async (req: Request, res: Response) => {
  try {
    const id = req.params.cart_id;
    console.log("Cart ID found:", id);
    let cart = await Connection.execute("checkoutCart", { cart_id: id });

    return res.json({  message: "Cart checkout success! We are working on your order" });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue checking out cart" });
  }
};



    //Dbhelper delete product in a cart

    export const deleteItemCart = async (req: Request, res: Response) => {
      try {
          const cart_id = req.params.cart_id;
          const product_id = req.body.product_id;
  
          console.log("Cart ID:", cart_id, "Product ID:", product_id);
  
          
          let result = await Connection.execute("deleteItemCart", { 
              cart_id: cart_id, 
              product_id: product_id
          });
  
          console.log("Result:", result);
          return res.json({ message: "Product removed from cart successfully." });
      } catch (error) {
          console.log("Error in marking product as removed from database", error);
          return res.status(400).json({ message: "There was an issue marking the product as removed from the cart." });
      }
  };
  