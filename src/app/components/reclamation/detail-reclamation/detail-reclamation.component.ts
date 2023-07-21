import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reclamation } from 'src/app/Entity/Reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-reclamation',
  templateUrl: './detail-reclamation.component.html',
  styleUrls: ['./detail-reclamation.component.css']
})
export class DetailReclamationComponent implements OnInit {
  
  id:number

  reclamation : Reclamation = new Reclamation();
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: ReclamationService ) { }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
        // Access path variables using params object
        this.id = params['id']; // For example, if your path variable is named 'id'
        // Do something with the path variable 'id'
      });
    
    this.service.consulterReclamation(this.id).subscribe(res => {
      this.reclamation=res;
  });
  }

  UpdateComp() {
    this.service.CloseReclamation(this.reclamation.id, this.reclamation.solution).subscribe(p => {
        console.log(this.reclamation);
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
          title: 'Reclamation closed ! '
        })
      }
    );
}
}
