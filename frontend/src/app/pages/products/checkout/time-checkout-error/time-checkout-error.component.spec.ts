import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeCheckoutErrorComponent } from './time-checkout-error.component';

describe('TimeCheckoutErrorComponent', () => {
  let component: TimeCheckoutErrorComponent;
  let fixture: ComponentFixture<TimeCheckoutErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeCheckoutErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeCheckoutErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
