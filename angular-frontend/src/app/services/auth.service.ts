import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {register} from '../interfaces/register.interfaces';
import {login} from '../interfaces/login.interfaces'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  registerUser(user_details:register ){
    return this.http.post<{message:string, error:string}>('http://localhost:4001/users', user_details)
  }

  loginUser(user_details:login ){
    return this.http.post<{message:string, token:string, error:string}>('http://localhost:4001/auth', user_details)
  }

  readToken(callback: (response: any) => void, errorCallback: (error: any) => void){

    const token = localStorage.getItem('authToken');

    if (!token) {
      errorCallback('No token found in local storage.');
      return;
    }


    console.log(token)
    this.http.get<{info:{id:string, email: string, role:string}}>('http://localhost:4001/auth/checkdetails', {
      headers: new HttpHeaders( {
        'Content-type': 'application/json',
        'token': token

      })
    }).subscribe(res=>callback(res))
  }
}
