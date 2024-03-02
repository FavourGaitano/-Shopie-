import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { PageNotfoundComponent } from './components/page-notfound/page-notfound.component';

export const routes: Routes = [

    { path: 'admin', component: AdminComponent},
    { path: '', component: HomeComponent},
    { path: 'registration', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'user', component: UserComponent},
    { path: 'home', component: HomeComponent},
    // {path:'**', component: PageNotfoundComponent},
    { path: 'cart', component: ShoppingCartComponent},
];
