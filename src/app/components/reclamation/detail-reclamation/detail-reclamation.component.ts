import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reclamation } from 'src/app/Entity/Reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';

@Component({
  selector: 'app-detail-reclamation',
  templateUrl: './detail-reclamation.component.html',
  styleUrls: ['./detail-reclamation.component.css']
})
export class DetailReclamationComponent implements OnInit {


  reclamation : Reclamation;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: ReclamationService ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.get('id');   
    this.service.consulterReclamation(id).subscribe(res => {
      this.reclamation=res;
  });
  }

  UpdateComp() {
    this.service.CloseReclamation(this.reclamation.id, this.reclamation.solution).subscribe(p => {
        console.log(this.reclamation);
        this.router.navigate(['user/forum']).then(() => {
            window.location.reload();
        });
    });
}
}
