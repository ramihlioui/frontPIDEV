import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { PropertiesComponent } from './properties/properties.component';

import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

import { SpinnerComponent } from './Loading/spinner/spinner.component';
import { LoadingInterceptor } from './Loading/loading.interceptor';

import {UserServiceService} from "./services/user-service.service";
import {AuthInterceptor} from "./auth/auth.interceptor";

import {MatPaginatorModule} from "@angular/material/paginator";

import {MatChipsModule} from "@angular/material/chips";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { ReclamationService } from './services/reclamation.service';
import { SellerGuard } from './auth/Seller.Guard';
import { LockComponent } from './pages/lock/lock.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ActivatedAccountComponent } from './pages/activated-account/activated-account.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { HeaderInterceptor } from './services/header.interceptor';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';





@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,

    PropertiesComponent,

    SpinnerComponent,
     LockComponent,
     ForgotPasswordComponent,
     ActivatedAccountComponent,
   
     AdminDashboardComponent,
     CalendarComponent,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    SellerGuard,
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor ,multi:true ,
    }
    
    
    ,
    UserServiceService,
    ReclamationService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
