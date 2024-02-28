import { Request, Response } from "express";
import {v4} from 'uuid'
import { Products } from "../Interface/products.interface";
import mssql from 'mssql';
import bcrypt from 'bcrypt'
import { sqlConfig } from '../Config/sql.Config';
import Connection from '../DbHelper/dbhelper';




////check if product exists then create products
export const createProduct = async (req: Request, res: Response) => {
  try {
    let id = v4();
    console.log("Products:", id);
    const { name, descr, price, image, category_id, quantity}: Products = req.body;

    console.log(req.body);


    const pool = await mssql.connect(sqlConfig);

    // checking  if product already  exists in the database by its name
    const result = (await pool
      .request()
      .input('name', mssql.VarChar, name)
      .execute("CheckProductExists")).recordset;

      console.log("Your result",result.length);

      if(result.length >=1){
        return res.status(503).json({message:"This product already exists"});
     
      }else { 
              const createProduct = (
                await pool
                  .request()
                .input('product_id', mssql.VarChar, id)
                .input('name', mssql.VarChar, name)
                .input('descr', mssql.VarChar, descr)
                .input('price', mssql.VarChar, price)
                .input('image', mssql.VarChar, image)
                .input('category_id', mssql.VarChar, category_id)
                .input('quantity', mssql.VarChar, quantity)
                .execute('createProduct')).rowsAffected;
             

              console.log(createProduct);
              return res.status(201).json
                ({message: "Product created succesfully."});
        };
        } catch (err) {
          console.log(err);
    return res.sendStatus(500).json({ message: err });
    }
};

//Dbhelper get all products
export const getAllProducts = async(req:Request, res: Response)=>{
    try {


        let products = (await Connection.execute("getAllProducts")).recordset
        

        if(products.length > 0){
            return res.json({
                products
            })
        }else{
            return res.json({
                message: "No products found"
            })
        }
        
    } catch (error:any) {
        return res.json({
            error: error.originalError.info.message
        })
    }
}

//Dbhelper get product by id

export const getOneProduct = async (req: Request, res: Response) => {
    try {
      const id = req.params.product_id;
      console.log("Product ID:", id);
      let product = (await Connection.execute("getOneProduct", { product_id: id })).recordset
  
      return res.json({ product });
    } catch (error) {
      console.log("Error in getting data from database", error);
      return res
        .status(400)
        .json({ message: "There was an issue retrieving product" });
    }
  };

//Dbhelper update product

export const updateProduct= async (req: Request, res: Response) => {
    try {
        const id = req.params.product_id;

        const {name, descr, price, image, category_id, quantity}:Products = req.body

      console.log("Product ID:", id);

  

      let product = (await (Connection.execute("updateProduct", { product_id:id,name, descr, price, image, category_id, quantity}))).recordset
  
      return res.json({ 
        
        message: "Product updated successfully"
     });

    } catch (error) {
      console.log("Error in updating data from database", error);
      return res
        .status(400)
        .json({ message: "There was an issue updating product" });
    }
  };

    //Dbhelper delete product

    export const deleteProduct = async (req: Request, res: Response) => {
        try {
          const id = req.params.product_id;
          console.log("Product ID:", id);
          let product = (await Connection.execute("deleteProduct", { product_id: id })).recordset
      
          return res.json({  message: "Product deleted successfully" });
        } catch (error) {
          console.log("Error in getting data from database", error);
          return res
            .status(400)
            .json({ message: "There was an issue deleting product" });
        }
      };