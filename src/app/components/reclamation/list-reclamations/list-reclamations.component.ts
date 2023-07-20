import { Component } from '@angular/core';
import { Reclamation } from 'src/app/Entity/Reclamation';

@Component({
  selector: 'app-list-reclamations',
  templateUrl: './list-reclamations.component.html',
  styleUrls: ['./list-reclamations.component.css']
})
export class ListReclamationsComponent {
  listcomp: Reclamation[];

}
