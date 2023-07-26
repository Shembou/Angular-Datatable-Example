import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './layout/product-details/product-details.component';
import { HomeComponent } from './layout/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './layout/login/login.component';

const routes: Routes = [
  { path: 'products/:id', component: ProductDetailsComponent, canActivate: [AuthGuard], data: { secured: false} },
  { path: 'products', component: HomeComponent, canActivate: [AuthGuard], data: { secured: false} },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo:'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
