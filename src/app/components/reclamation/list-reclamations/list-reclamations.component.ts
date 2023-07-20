import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Reclamation } from 'src/app/Entity/Reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';

@Component({
  selector: 'app-list-reclamations',
  templateUrl: './list-reclamations.component.html',
  styleUrls: ['./list-reclamations.component.css']
})
export class ListReclamationsComponent {
  listcomp: Reclamation[];
  constructor(private router: Router, private service: ReclamationService) { }


  ngOnInit(): void {
  this.service.getReclamations().subscribe(res => {console.log(res); this.listcomp = res; });
  }

  deleteReclamation(id: number) {
    this.service.DeleteReclamation(id).subscribe(p => {
      console.log('delete');
    });
  }
}
