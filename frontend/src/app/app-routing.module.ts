import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './pages/home/home.component';
import { ProductsPage } from './pages/products/products.component';
import { TestimonialsPage } from './pages/testimonials/testimonials.component';
import { AboutPage } from './pages/about/about.component';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'products', component: ProductsPage },
  { path: 'testimonials', component: TestimonialsPage },
  { path: 'about', component: AboutPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
