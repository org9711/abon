import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared-components/navbar/navbar.component';
import { BurgerComponent } from './shared-components/navbar/burger/burger.component';
import { HomePageComponent } from './pages/home/home.component';
import { ProductsPageComponent } from './pages/products/products.component';
import { TestimonialsPageComponent } from './pages/testimonials/testimonials.component';
import { AboutPageComponent } from './pages/about/about.component';
import { WiggleComponent } from './shared-components/wiggle/wiggle.component';
import { HomeAnimationsComponent } from './pages/home/home-animations/home-animations.component';
import { ProductDisplayContainerComponent } from './pages/products/product-display-container/product-display-container.component';
import { ProductDisplayComponent } from './pages/products/product-display/product-display.component';
import { PopupLayoutComponent } from './shared-components/popup-layout/popup-layout.component';
import { ProductInfoComponent } from './pages/products/product-info/product-info.component';
import { PopupManagerComponent } from './shared-components/popup-manager/popup-manager.component';
import { BasketContainerComponent } from './pages/products/basket-container/basket-container.component';
import { BasketRowComponent } from './pages/products/basket-row/basket-row.component';
import { CheckoutComponent } from './pages/products/checkout/checkout.component';
import { CheckoutRowComponent } from './pages/products/checkout/checkout-row/checkout-row.component';
import { ErrorMessageComponent } from './shared-components/error-message/error-message.component';
import { InitiateOrderErrorComponent } from './pages/products/initiate-order-error/initiate-order-error.component';
import { TimeCheckoutErrorComponent } from './pages/products/checkout/time-checkout-error/time-checkout-error.component';
import { CustomerFormsComponent } from './pages/products/checkout/customer-forms/customer-forms.component';
import { BasketOverviewComponent } from './pages/products/checkout/basket-overview/basket-overview.component';
import { CheckoutTimerComponent } from './pages/products/checkout/checkout-timer/checkout-timer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BurgerComponent,
    HomePageComponent,
    ProductsPageComponent,
    TestimonialsPageComponent,
    AboutPageComponent,
    WiggleComponent,
    HomeAnimationsComponent,
    ProductDisplayContainerComponent,
    ProductDisplayComponent,
    PopupLayoutComponent,
    ProductInfoComponent,
    PopupManagerComponent,
    BasketContainerComponent,
    BasketRowComponent,
    CheckoutComponent,
    CheckoutRowComponent,
    ErrorMessageComponent,
    InitiateOrderErrorComponent,
    TimeCheckoutErrorComponent,
    CustomerFormsComponent,
    BasketOverviewComponent,
    CheckoutTimerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
