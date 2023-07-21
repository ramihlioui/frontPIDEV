import { Injectable } from '@angular/core';
import {UserAuthService} from './user-auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Entity/UserModel';
import axios, { AxiosRequestConfig } from 'axios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  PATH = "http://localhost:8080";
 
  requestHeaders = new HttpHeaders({"No-Auth":"True"});
  requestHeaders2 = new HttpHeaders(    {"Authorization":"Bearer"+ `Bearer ${this.userAut.getToken()}`});

  constructor(private httpClient:HttpClient,private router:Router,private  userAut:UserAuthService) { }

  public loginUser(loginData:any){
   
    console.log("body  :",loginData)
    return  axios.post<any>("http://localhost:8080/auth/authenticate", loginData)
  }

  public registerUser(registerData:any){
   
    console.log("body  :",registerData)
    return  axios.post<any>("http://localhost:8080/auth/register", registerData)
  }


  forgotPassword(email:string){
    const body = {email};
    console.log("body : ",body)
    return axios.post<any>("http://localhost:8080/auth/forgot-password", body)

  } 

    resetPassword(password:string, token:string){
      console.log("token : ",token)
      const body = {password};
      console.log("body : ",body)
      return axios.put<any>(`http://localhost:8080/auth/reset-password?token=${token}`, body).then(
        response => {
          console.log("password changed")
          this.router.navigate(['/login']); // Replace 'target-route' with the desired route path

        })  
    } 

    ActivateAccount(token:string){
 
      return axios.post<any>(`http://localhost:8080/auth/confirm?token=${token}`)
  
    } 

  getUserById(id: number): Observable<User> {
    const url = `${this.PATH}/user/${id}`;
    console.log(url)
    return this.httpClient.get<User>(url);
  }


  public getAllUsers()
  {
    const token = localStorage.getItem("token")
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    return axios.get("http://localhost:8080/user/all", config);
  }
  public getAllRoles()
  {
    return this.httpClient.get(this.PATH+"/getAllRole",{headers : this.requestHeaders})
  }
  public RoleMatch(allowedRoles:any):boolean
  {
    let roles:any = this.userAut.getRoles();

    for(const element of roles) {
      for (const item of allowedRoles) {
        if (element == item)
        {
          return true;
        }

      }
    }
    return false;

  }




}
