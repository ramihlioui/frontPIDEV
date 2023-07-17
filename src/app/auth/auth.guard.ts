import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserAuthService} from "../services/user-auth.service";
import {UserServiceService} from "../services/user-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private  userAuth:UserAuthService,private router:Router,private userService:UserServiceService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.userAuth.getToken();



    if(token != null)
    {
      const  role = route.data["roles"] as Array<string>;

      if(route.url.toString() == "login" && !this.userAuth.isLoggedIn())
      {
        return true;
      }



      if (role)
      {

        const match = this.userService.RoleMatch(role);
        if(match)
        {
          return true;
        }
        else {
          this.router.navigate([('/forbidden')]);
          return false;
        }


      }

    }

    this.router.navigate([('/login')])
    return false;
  }

}
