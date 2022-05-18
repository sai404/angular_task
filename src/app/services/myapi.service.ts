import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MyapiService {

  constructor(private http:HttpClient) { }

  postUser(data: any){
    return this.http.post<any>("https://624e802053326d0cfe5bb249.mockapi.io/data",data)
  }
  getUser(){
    return this.http.get<any>("https://624e802053326d0cfe5bb249.mockapi.io/data")
  }
  deleteUser(id:number){
    return this.http.delete<any>("https://624e802053326d0cfe5bb249.mockapi.io/data/"+id)
  }
  updateUser(data:any,id:number){
    return this.http.put<any>("https://624e802053326d0cfe5bb249.mockapi.io/data/"+id,data)
  }
}
