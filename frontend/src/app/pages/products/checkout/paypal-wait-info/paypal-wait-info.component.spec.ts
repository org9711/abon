import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalWaitInfoComponent } from './paypal-wait-info.component';

describe('PaypalWaitInfoComponent', () => {
  let component: PaypalWaitInfoComponent;
  let fixture: ComponentFixture<PaypalWaitInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaypalWaitInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalWaitInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
