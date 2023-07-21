import {Component, OnInit} from '@angular/core';
import {UserAuthService} from "../../services/user-auth.service";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from 'src/app/Entity/UserModel';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{

  constructor(public userAuth:UserAuthService,private router:Router,private userService: UserServiceService,private url:ActivatedRoute) { }

  user: User
  ngOnInit() {
    

    if(this.userAuth.getLoginSucessNotif() == "0") {
      this.userAuth.setLoginSucessNotif("1")
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
      }).then()
    }

  }





}
