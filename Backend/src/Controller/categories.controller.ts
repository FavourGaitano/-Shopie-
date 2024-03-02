import { Request, Response } from "express";
import {v4} from 'uuid'
import { Categories } from "../Interface/categories.interface";
import mssql from 'mssql';
import { sqlConfig } from '../Config/sql.Config';
import Connection from '../DbHelper/dbhelper';




////check if category exists then create category
export const createCategory = async (req: Request, res: Response) => {
  try {
    let id = v4();
    console.log("Categories:", id);
    const { name, description}: Categories = req.body;

    console.log(req.body);


    const pool = await mssql.connect(sqlConfig);

    // checking  if category already  exists in the database by its name
    const result = (await pool
      .request()
      .input('name', mssql.VarChar, name)
      .execute("CheckCategoryExists")).recordset;

      console.log("Your result",result.length);

      if(result.length >=1){
        return res.status(503).json({message:"This category already exists"});
     
      }else { 
              const createCategory = (
                await pool
                  .request()
                  .input("category_id", mssql.VarChar, id)
                  .input("name", mssql.VarChar, name)
                  .input("description", mssql.VarChar, description)
                .execute('createCategory')).rowsAffected;
             

              console.log(createCategory);
              return res.status(201).json
                ({message: "Category created succesfully."});
        };
        } catch (err) {
          console.log(err);
    return res.sendStatus(500).json({ message: err });
    }
};

//Dbhelper get all categories
export const getAllCategories = async(req:Request, res: Response)=>{
    try {


        let categories = (await Connection.execute("getAllCategories")).recordset
        

        if(categories.length > 0){
            return res.json({
                categories
            })
        }else{
            return res.json({
                message: "No category found"
            })
        }
        
    } catch (error:any) {
        return res.json({
            error: error.originalError.info.message
        })
    }
}

//Dbhelper get category by id

export const getOneCategory = async (req: Request, res: Response) => {
    try {
      const id = req.params.category_id;
      console.log("Category ID:", id);
      let category = (await Connection.execute("getOneCategory", { category_id: id })).recordset
  
      return res.json({ category });
    } catch (error) {
      console.log("Error in getting data from database", error);
      return res
        .status(400)
        .json({ message: "There was an issue retrieving category" });
    }
  };

//Dbhelper update category

export const updateCategory= async (req: Request, res: Response) => {
    try {
        const id = req.params.category_id;

        const {name, description}:Categories = req.body

      console.log("Category ID:", id);

  

      let category = (await (Connection.execute("updateCategory", { category_id:id, name,description}))).recordset
  
      return res.json({ 
        
        message: "Category updated successfully"
     });

    } catch (error) {
      console.log("Error in updating data from database", error);
      return res
        .status(400)
        .json({ message: "There was an issue updating category" });
    }
  };

    //Dbhelper delete category

    export const deleteCategory = async (req: Request, res: Response) => {
        try {
          const id = req.params.category_id;
          console.log("Category ID:", id);
          let category = (await Connection.execute("deleteCategory", { category_id: id })).recordset
      
          return res.json({  message: "Category deleted successfully" });
        } catch (error) {
          console.log("Error in getting data from database", error);
          return res
            .status(400)
            .json({ message: "There was an issue deleting category" });
        }
      };