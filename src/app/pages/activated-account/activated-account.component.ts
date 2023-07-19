import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activated-account',
  templateUrl: './activated-account.component.html',
  styleUrls: ['./activated-account.component.css']
})
export class ActivatedAccountComponent {

  constructor(private user : UserServiceService,private route:ActivatedRoute) {}
  token = this.route.snapshot.queryParamMap.get('token')

  ngOnInit() {


    this.user.ActivateAccount(this.token)

    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      heightAuto:false,
      showConfirmButton: false,
      timer: 10000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: 'Account has been activated please login'
    })

  }



}
