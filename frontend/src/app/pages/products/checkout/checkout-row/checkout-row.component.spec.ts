import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutRowComponent } from './checkout-row.component';

describe('CheckoutRowComponent', () => {
  let component: CheckoutRowComponent;
  let fixture: ComponentFixture<CheckoutRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
