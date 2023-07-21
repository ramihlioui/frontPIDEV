import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ForumComponent } from './forum/forum.component';
import { FooterComponent } from './footer/footer.component';
import { MapNavigationComponent } from './map-navigation/map-navigation.component';
import { MapComponent } from './map/map.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddReclamationComponent } from './reclamation/add-reclamation/add-reclamation.component';
import { DetailReclamationComponent } from './reclamation/detail-reclamation/detail-reclamation.component';
import { ListReclamationsComponent } from './reclamation/list-reclamations/list-reclamations.component';
import { SidebarComponent } from './sidebar/sidebar.component';

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
    MapComponent,
    MapNavigationComponent,
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
