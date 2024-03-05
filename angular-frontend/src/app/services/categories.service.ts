import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { categoriesResponse } from '../interfaces/categoriesResponse.interface';
import { updateCategory } from '../interfaces/categories.interface';
import {OnecategoryResponse} from '../interfaces/categoriesResponse.interface'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  token = localStorage.getItem('authToken') as string

  constructor(private http:HttpClient) {}

  getCategories(){
    const token = localStorage.getItem('authToken') as string
    return this.http.get<categoriesResponse>('http://localhost:4001/categories/get', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }

  deleteCategory(id:string){
    const token = localStorage.getItem('authToken') as string
    return this.http.delete(`http://localhost:4001/categories/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }

  getOneCategoryDetails(id:string){
    const token = localStorage.getItem('authToken') as string

    return this.http.get<OnecategoryResponse>(`http://localhost:4001/categories/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }


  updateCategoryDetails(id:string, details:updateCategory){

    const token = localStorage.getItem('authToken') as string

    return this.http.put<{message:string, error:string}>(`http://localhost:4001/categories/update/${id}`, details,{
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }
}
