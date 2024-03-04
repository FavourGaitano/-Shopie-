import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [

    { path: 'admin', component: AdminComponent, children:[
      {path: 'view-users', component: ViewUsersComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'update-user/:user_id', component: UpdateUserComponent},
      {path: 'view-products', component: ViewProductsComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'update-product/:product_id', component: UpdateProductComponent}
    ]},
    { path: '', component: HomeComponent},
    { path: 'registration', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'user', component: UserComponent},
    { path: 'home', component: HomeComponent},
    // {path:'**', component: PageNotfoundComponent},
    { path: 'cart', component: ShoppingCartComponent},
];
