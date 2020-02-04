import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BurgerComponent } from './components/navbar/burger/burger.component';
import { HomePage } from './pages/home/home.component';
import { ProductsPage } from './pages/products/products.component';
import { TestimonialsPage } from './pages/testimonials/testimonials.component';
import { AboutPage } from './pages/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BurgerComponent,
    HomePage,
    ProductsPage,
    TestimonialsPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
