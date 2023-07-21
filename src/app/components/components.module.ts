import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ForumComponent } from './forum/forum.component';
import { AddReclamationComponent } from './reclamation/add-reclamation/add-reclamation.component';
import { ListReclamationsComponent } from './reclamation/list-reclamations/list-reclamations.component';
import { DetailReclamationComponent } from './reclamation/detail-reclamation/detail-reclamation.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule, 
    FormsModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ForumComponent,
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
