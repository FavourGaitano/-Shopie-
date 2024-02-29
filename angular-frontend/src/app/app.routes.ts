import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [

    { path: 'admin', component: AdminComponent},
    { path: '', component: HomeComponent},
    { path: 'registration', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    // { path: 'user', component: UserDashboardComponent},
    { path: 'home', component: HomeComponent},
    // {path:'**', component: NotfoundComponent}
    { path: 'cart', component: ShoppingCartComponent},
];
