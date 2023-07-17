import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';

import {AuthGuard} from "../../auth/auth.guard";


export const AdminLayoutRoutes: Routes = [
  { path: 'user-profile',   component: UserProfileComponent,canActivate:[AuthGuard],data:{roles:['User'] } },
    { path: 'dashboard',      component: DashboardComponent,canActivate:[AuthGuard],data:{roles:['Admin']} },


];
