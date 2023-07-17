import { Injectable } from '@angular/core';
import {UserAuthService} from './user-auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Entity/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  PATH = "http://localhost:8080";
  requestHeaders = new HttpHeaders({"No-Auth":"True"});
  requestHeaders2 = new HttpHeaders(    {"Authorization":"Bearer"+ `Bearer ${this.userAut.getToken()}`});

  constructor(private httpClient:HttpClient,private  userAut:UserAuthService) { }



  public loginUser(loginData:any){
   
    console.log("body  :",loginData)
   return  this.httpClient.post<any>("http://localhost:8080/auth/authenticate", loginData)
  }

  getUserById(id: number): Observable<User> {
    const url = `${this.PATH}/user/${id}`;
    console.log(url)
    return this.httpClient.get<User>(url);
  }


  public getAllUsernames()
  {
return this.httpClient.get(this.PATH+"/getAllUsernames",{headers : this.requestHeaders});
  }
  public getAllRoles()
  {
    return this.httpClient.get(this.PATH+"/getAllRole",{headers : this.requestHeaders})
  }
  public RoleMatch(allowedRoles:any):boolean
  {
    let isMatch = false;
    let roles:any = this.userAut.getRoles();

    for(const element of roles) {
      for (const item of allowedRoles) {
        if (element.roleName === item)
        {
          isMatch = true;
          return isMatch;
        }

      }
    }
    return false;

  }




}
