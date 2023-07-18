import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './layout/product-details/product-details.component';
import { HomeComponent } from './layout/home/home.component';

const routes: Routes = [
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'products', component: HomeComponent },
  { path: '', redirectTo:'products', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
