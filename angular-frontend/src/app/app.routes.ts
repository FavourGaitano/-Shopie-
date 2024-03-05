import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AdminComponent } from './components/admin/admin.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { ProductsComponent } from './components/products/products.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { ViewCategoriesComponent } from './components/view-categories/view-categories.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';
import { UserComponent } from './components/user/user.component';
import { ViewOneProductComponent } from './components/view-one-product/view-one-product.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';

export const routes: Routes = [

    { path: 'admin', component: AdminComponent, children:[
      {path: 'view-users', component: ViewUsersComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'update-user/:user_id', component: UpdateUserComponent},
      {path: 'view-products', component: ViewProductsComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'update-product/:product_id', component: UpdateProductComponent},
      {path: 'view-categories', component: ViewCategoriesComponent},
      {path: 'categories', component: CategoriesComponent},
      {path: 'update-category/:category_id', component: UpdateCategoryComponent},
      {path: 'view-orders', component: ViewOrdersComponent},
    ]},
    { path: '', component: HomeComponent},
    { path: 'registration', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'user', component: UserComponent},
    { path: 'view-one-product', component: ViewOneProductComponent},

    { path: 'home', component: HomeComponent},
    // {path:'**', component: PageNotfoundComponent},
    { path: 'cart', component: ShoppingCartComponent},
];
