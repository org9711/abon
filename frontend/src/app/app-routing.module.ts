import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home/home.component';
import { ProductsPageComponent } from './pages/products/products.component';
import { TestimonialsPageComponent } from './pages/testimonials/testimonials.component';
import { AboutPageComponent } from './pages/about/about.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'products', component: ProductsPageComponent },
  { path: 'testimonials', component: TestimonialsPageComponent },
  { path: 'about', component: AboutPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
