import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ordersResponse } from '../interfaces/ordersResponse.interface';
import { OneUserordersResponse } from '../interfaces/ordersResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  token = localStorage.getItem('authToken') as string

  constructor(private http:HttpClient) { }

  getOrders(){
    const token = localStorage.getItem('authToken') as string
    return this.http.get<ordersResponse>('http://localhost:4001/order', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }

  changeStatus(id:string){
    const token = localStorage.getItem('authToken') as string

    return this.http.post<{message:string}>(`http://localhost:4001/order/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
         token
      })
    })
  }

  getUserOrder(id:string){
    const token = localStorage.getItem('authToken') as string

    return this.http.get<OneUserordersResponse>(` http://localhost:4001/order/userID/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }
}
