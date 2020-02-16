import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutTimerComponent } from './checkout-timer.component';

describe('CheckoutTimerComponent', () => {
  let component: CheckoutTimerComponent;
  let fixture: ComponentFixture<CheckoutTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
