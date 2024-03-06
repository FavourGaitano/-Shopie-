import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { OneUsercartResponse } from '../interfaces/cartResponse.interface';
import{deleteItemCart} from '../interfaces/cart.interface'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  token = localStorage.getItem('authToken') as string

  constructor(private http:HttpClient) { }

  getUserCart(id:string){
    const token = localStorage.getItem('authToken') as string

    return this.http.get<OneUsercartResponse >(` http://localhost:4001/cart/userID/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }


  deleteItemCart(id: string, details: deleteItemCart) {
    const token = localStorage.getItem('authToken') as string;
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      token,
    });


    const req = new HttpRequest('DELETE', `http://localhost:4001/cart/${id}`, details, { headers });


    return this.http.request(req);
  }
}
