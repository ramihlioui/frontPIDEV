import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';

import { SellerGuard } from 'src/app/auth/Seller.Guard';


export const AdminLayoutRoutes: Routes = [
  { path: 'user-profile',   component: UserProfileComponent,canActivate:[SellerGuard], data: { allowedRoles: ['ROLE_SELLER', 'ROLE_BUYER'] } },
    { path: 'dashboard',      component: DashboardComponent,canActivate:[SellerGuard],data:{roles:['ROLE_SELLER']} },


];
