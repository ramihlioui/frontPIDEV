import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import { LockComponent } from 'src/app/pages/lock/lock.component';
import { ForgotPasswordComponent } from 'src/app/pages/forgot-password/forgot-password.component';
import { ActivatedAccountComponent } from 'src/app/pages/activated-account/activated-account.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'activated', component: ActivatedAccountComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: LockComponent },
    {path : 'dashboard' ,      component: DashboardComponent }
];
