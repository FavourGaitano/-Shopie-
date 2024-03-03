import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userResponse } from '../interfaces/userResponse.interfaces';
import {  updateUser } from '../interfaces/user.interfaces';
import { OneUserResponse } from '../interfaces/userResponse.interfaces';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token = localStorage.getItem('authToken') as string


  constructor(private http:HttpClient) { }

  getUsers(){
    const token = localStorage.getItem('authToken') as string
    return this.http.get<userResponse>('http://localhost:4001/users', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }

  deleteUser(id:string){
    const token = localStorage.getItem('authToken') as string
    return this.http.delete(`http://localhost:4001/users/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }

  getOneUserDetails(id:string){
    const token = localStorage.getItem('authToken') as string

    return this.http.get<OneUserResponse>(`http://localhost:4001/users/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }


  updateUserDetails(id:string, details:updateUser){

    const token = localStorage.getItem('authToken') as string

    return this.http.put<{message:string, error:string}>(`http://localhost:4001/users/${id}`, details,{
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }
}
