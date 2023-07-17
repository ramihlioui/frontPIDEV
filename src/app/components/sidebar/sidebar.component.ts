import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserServiceService} from "../../services/user-service.service";
import {UserAuthService} from "../../services/user-auth.service";

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;

    role : string[]|any;
}
export const ROUTES: RouteInfo[] = [

  { path: '/user-profile', title: 'Home',  icon:'ni-planet text-blue', class: '',role:['User']},
  { path: '/affected-requests', title: 'Affected Requests',  icon:'ni-folder-17 text-orange', class: '',role:['User']},
  { path: '/processed-requests', title: 'processed Requests',  icon:'ni-check-bold text-green', class: '',role:['User']},
  { path: '/on-going-requests', title: 'Requests In Progress',  icon:'ni-active-40 text-red', class: '',role:['User']},

  { path: '/workflow', title: 'Workflows',  icon:'ni ni-archive-2 text-green', class: '' ,role:['Admin','Validator'] },
  {path : '/process',title:'Process',icon:'ni ni-settings-gear-65 text-cyan',class:'',role:['Admin','Validator'] },
  { path: '/tasks', title: 'Tasks',  icon:'ni-books text-red', class: '' ,role:['Admin','Validator']},
  { path: '/service-task', title: 'Service Tasks',  icon:'ni-email-83 text-orange', class: '',role:['Admin'] },
  {path:'/forms' ,title : 'Forms' , icon : 'ni ni-single-copy-04 text-red',class : '',role:['Admin']},
    //{ path: '/dashboard', title: 'History',  icon: 'ni-tv-2 text-primary', class: '' ,role:['Admin']},
  //  { path: '/diagram', title: 'Workflow modeler',  icon:'ni-planet text-blue', class: '' },
 // { path: '/formeditor', title: 'Form Editor',  icon:'ni ni-align-left-2 text-purple', class: '' },







  // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    //{ path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router,public userService:UserServiceService,private userAuthService:UserAuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
  Logout() {
    this.userAuthService.clear()
    this.router.navigate(["/login"]).then()
  }

}
