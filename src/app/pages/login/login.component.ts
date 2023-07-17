import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserServiceService} from '../../services/user-service.service';
import {UserAuthService} from '../../services/user-auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private  userService:UserServiceService,private authService:UserAuthService,private router:Router) {}


  loginUser(loginForm:NgForm)
  {
    console.log(loginForm.value);
    this.userService.loginUser(loginForm.value).subscribe(
    (response:any) => {

      this.authService.setToken(response.token)


      
      this.router.navigate(["/user-profile"]);
      
     
    }
  );
  }

  ngOnInit() {
    this.authService.setLoginSucessNotif("0");
    if(this.authService.isLoggedIn() && this.userService.RoleMatch(["User"]))
    {
      this.router.navigate(["/user-profile"]).then( () =>
        {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
        }

      )
    }
    else if(this.authService.isLoggedIn() && this.userService.RoleMatch(["Admin"]))
    {
    this.router.navigate(["/workflow"]).then()
    }
    else {
      this.router.navigate(["/workflow"]).then()

    }

  }
  ngOnDestroy() {
  }




}
