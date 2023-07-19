import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddReclamationComponent } from './reclamation/add-reclamation/add-reclamation.component';
import { ListReclamationsComponent } from './reclamation/list-reclamations/list-reclamations.component';
import { DetailReclamationComponent } from './reclamation/detail-reclamation/detail-reclamation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AddReclamationComponent,
    ListReclamationsComponent,
    DetailReclamationComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
