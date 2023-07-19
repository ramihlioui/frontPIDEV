import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserAuthService } from "../services/user-auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class SellerGuard implements CanActivate {
  constructor(private authService: UserAuthService, private router : Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = route.data.allowedRoles as string[]; 
    console.log(allowedRoles)
    const userRole = this.authService.getRoles(); // Get the user's role from the authentication service
    console.log(userRole);
    if (userRole.some(role => allowedRoles.includes(role))) {
        return true; // Allow access if the user has any of the allowed roles
      } else {
        // Redirect to an appropriate page or show an access denied message
        // You can also navigate to a different route if needed
        this.router.navigate(['/access-denied']);
        return false;
      }
    }
}