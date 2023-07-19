import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth : UserAuthService,private user : UserServiceService,private http: HttpClient ) { }

  ngOnInit() {
  }

  fullName: string;
  email: string;
  password: string;
  roles: string[] = ['BUYER', 'SELLER']; // List of roles

  selectedRoles: string[] = ['BUYER']; // Default role(s), you can set it based on your requirements

  onRoleChange(role: string) {
    if (this.selectedRoles.includes(role)) {
      // If the role is already in the selectedRoles list, remove it (toggle off)
      this.selectedRoles = this.selectedRoles.filter(selectedRole => selectedRole !== role);
    } else {
      // If the role is not in the selectedRoles list, add it (toggle on)
      this.selectedRoles.push(role);
    }
  }

  onSignup() {
    console.log('Form Data:', this.fullName, this.email, this.password);
    console.log('Selected Roles:', this.selectedRoles);
    const data = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      roles: this.selectedRoles.map(role => ({ role }))
    };
  
    // Make the API call to send the data to the backend
    this.user.registerUser(data).then(
      response => {
        this.user.forgotPassword(this.email).then(res => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 6000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'An email has been sent to confirm your account'
          })
        })
      },
      error => {
        console.error('Error occurred:', error);
      }
    );


  }
}


