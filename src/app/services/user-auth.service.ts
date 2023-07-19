import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() {
  }

  public setLoginSucessNotif(success:string)
  {
    localStorage.setItem("successNotify",success);
  }
  public getLoginSucessNotif()
  {
   return  localStorage.getItem("successNotify");
  }
  public setRoles(roles:[])
{
  localStorage.setItem("roles",JSON.stringify(roles))
}
public getRoles():[]
{

  return JSON.parse(localStorage.getItem("roles") || '{}');
}

public  getToken()
{
  console.log("token retreived : ",localStorage.getItem("token"))

  return localStorage.getItem("token");
}
public  getUsername()
{
  return localStorage.getItem("username");
}
public setUsername(username:any)
{
  localStorage.setItem("username",username);
}

public setToken(token : string)
{
  localStorage.setItem("token",token);
}


public  clear()
{
  localStorage.clear();
}

public  isLoggedIn()
  {
  return this.getToken() && this.getRoles();
  }


}
