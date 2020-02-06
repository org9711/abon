import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BurgerComponent } from './components/navbar/burger/burger.component';
import { HomePage } from './pages/home/home.component';
import { ProductsPage } from './pages/products/products.component';
import { TestimonialsPage } from './pages/testimonials/testimonials.component';
import { AboutPage } from './pages/about/about.component';
import { WiggleComponent } from './components/wiggle/wiggle.component';
import { HomeAnimationsComponent } from './pages/home/components/home-animations/home-animations.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BurgerComponent,
    HomePage,
    ProductsPage,
    TestimonialsPage,
    AboutPage,
    WiggleComponent,
    HomeAnimationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InlineSVGModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
