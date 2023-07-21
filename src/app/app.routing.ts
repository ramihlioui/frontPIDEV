import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";

import { SellerGuard } from "./auth/Seller.Guard";
import { ForumComponent } from './components/forum/forum.component';
import { MapNavigationComponent } from "./components/map-navigation/map-navigation.component";
import { MapComponent } from "./components/map/map.component";
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/layouts/admin-layout/admin-layout.module").then(
            (m) => m.AdminLayoutModule
          ),
      },
    ],
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: 'forum',
        component: ForumComponent,
        pathMatch: 'full',
      },
      {
        path: "",
        loadChildren: () =>
          import("src/app/layouts/auth-layout/auth-layout.module").then(
            (m) => m.AuthLayoutModule
          ),
      },
    ],
  },
  {
    path: "heatmap",
    component: MapComponent,
    canActivate: [SellerGuard],
    data: { allowedRoles: ["ROLE_SELLER", "ROLE_BUYER"], hideUI: true },
  },
  {
    path: "navigate",
    component: MapNavigationComponent,
    canActivate: [SellerGuard],
    data: { allowedRoles: ["ROLE_SELLER", "ROLE_BUYER"], hideUI: true },
  }
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes, {})],
  exports: [],
})
export class AppRoutingModule {}
