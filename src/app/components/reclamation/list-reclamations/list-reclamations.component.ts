import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Reclamation } from 'src/app/Entity/Reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;   

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
      window.location.reload();
    });
  }
  generatePDF(rec: Reclamation) {
    let docDefinition = {
      content: [
        {
          text: 'Immeuble application',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'Reclamation',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        {
          text: 'User Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: rec.claimer.fullName,
                bold:true
              }
            ],
            [
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              { 
                text: `Bill No : ${rec.id}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {text: 'Title : '+rec.title},
        {text: 'Description : '+rec.description},
        {text: 'Is is treated? : '+rec.treated},
        {text: 'Created at : '+rec.creationDate},
        {text: 'Solution : '+rec.solution},
        {
          columns: [
            [{ qr: `${rec.claimer.fullName}`, fit: '50' }],
            [{ text: 'Signature', alignment: 'right', italics: true}],
          ]
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader'
        },
        {
            ul: [
              'Reclamation are property of the application.',
              'Failiure to comply with terms and conditions will result in immidiate death.',
              'This is system generated Reclamation never trust the machine.',
              'Hakuna Matata',
            ],
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]          
        }
      }
    };
    pdfMake.createPdf(docDefinition).open();      
  }
}
