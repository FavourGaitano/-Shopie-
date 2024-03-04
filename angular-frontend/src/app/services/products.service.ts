import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {productsResponse} from '../interfaces/productsResponse.interfaces';
import { updateProduct } from '../interfaces/products.interfaces';
import {OneproductResponse} from '../interfaces/productsResponse.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  token = localStorage.getItem('authToken') as string

  constructor(private http:HttpClient) {}

  getProducts(){
    // const token = localStorage.getItem('authToken') as string
    return this.http.get<productsResponse>('http://localhost:4001/product', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        // token
      })
    })
  }

  deleteProduct(id:string){
    const token = localStorage.getItem('authToken') as string
    return this.http.delete(`http://localhost:4001/product/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }

  getOneProductDetails(id:string){
    const token = localStorage.getItem('authToken') as string

    return this.http.get<OneproductResponse>(`http://localhost:4001/product/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }


  updateProductDetails(id:string, details:updateProduct){

    const token = localStorage.getItem('authToken') as string

    return this.http.put<{message:string, error:string}>(`http://localhost:4001/product/${id}`, details,{
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }
}
