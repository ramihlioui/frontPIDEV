import {Component, OnInit} from '@angular/core';
import {UserAuthService} from "../../services/user-auth.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from 'src/app/Entity/UserModel';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{

  constructor(public userAuth:UserAuthService,private router:Router,private userService: UserServiceService) { }

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

    this.getUserById()
  }

  getUserById(){
    const userId = 5; // Replace with the desired user ID
    this.userService.getUserById(userId).subscribe(
      user => {
        this.user = user;
        console.log(user)
      },
      error => {
        console.log('Error occurred while fetching user:', error);
      }
    );
  }




}
