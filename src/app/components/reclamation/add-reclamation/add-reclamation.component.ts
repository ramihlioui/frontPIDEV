import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Reclamation } from 'src/app/Entity/Reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';

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
      this.router.navigate(['']).then(() => {
        window.location.reload();
      });

    });


}}