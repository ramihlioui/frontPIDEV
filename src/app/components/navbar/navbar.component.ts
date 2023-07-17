import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import {UserAuthService} from "../../services/user-auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public username:string;
  public listTitles: any[];
  public location: Location;
  constructor(location: Location,private userAuthService:UserAuthService,private router:Router) {
    this.location = location;
  }

  ngOnInit() {
    this.username = this.userAuthService.getUsername();
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle(){
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(const element of this.listTitles) {
      if (element.path === titlee) {
        return element.title;
        }
    }
    return '';
  }

  Logout() {
    this.userAuthService.clear()
    this.router.navigate(["/login"])
  }
}
