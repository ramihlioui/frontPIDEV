import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Reclamation } from 'src/app/Entity/Reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamationComponent {
  
newReclamation = new Reclamation();
constructor(private router: Router , private ComplaintService: ReclamationService , http: HttpClient) {
}

ngOnInit(): void {
}
  addReclamation(){
    this.ComplaintService.ajouterReclamation(this.newReclamation).subscribe(comp => {
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
          title: 'Reclamation sent ! '
        })
      }

    });


}}