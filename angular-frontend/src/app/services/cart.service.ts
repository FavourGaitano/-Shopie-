import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OneUsercartResponse } from '../interfaces/cartResponse.interface';

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
}
