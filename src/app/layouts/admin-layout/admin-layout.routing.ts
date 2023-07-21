import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";

import { SellerGuard } from "src/app/auth/Seller.Guard";
import { AddReclamationComponent } from "src/app/components/reclamation/add-reclamation/add-reclamation.component";
import { DetailReclamationComponent } from "src/app/components/reclamation/detail-reclamation/detail-reclamation.component";
import { ListReclamationsComponent } from "src/app/components/reclamation/list-reclamations/list-reclamations.component";
import { AdminDashboardComponent } from "src/app/pages/admin-dashboard/admin-dashboard.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: "user-profile",
    component: UserProfileComponent,
    canActivate: [SellerGuard],
    data: { allowedRoles: ["ROLE_SELLER", "ROLE_BUYER"] },
  },
  {
    path: "dashboard",
    component: AdminDashboardComponent,
    canActivate: [SellerGuard],
    data: { allowedRoles: ["ROLE_ADMIN"] },
  },
  {
    path: "reclamationadmin",
    component: ListReclamationsComponent,
    canActivate: [SellerGuard],
    data: { allowedRoles: ["ROLE_SELLER", "ROLE_BUYER"] },
  },
  {
    path: "updaterec/:id",
    component: DetailReclamationComponent,
    canActivate: [SellerGuard],
    data: { allowedRoles: ["ROLE_SELLER", "ROLE_BUYER"] },
  },
  {
    path: "addReclamation",
    component: AddReclamationComponent,
    canActivate: [SellerGuard],
    data: { allowedRoles: ["ROLE_SELLER", "ROLE_BUYER"] },
  },

  {
    path: "user-profile",
    component: UserProfileComponent,
    canActivate: [SellerGuard],
    data: { allowedRoles: ["ROLE_SELLER", "ROLE_BUYER"] },
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [SellerGuard],
    data: { allowedRoles: ["ROLE_SELLER"] },
  },
];
