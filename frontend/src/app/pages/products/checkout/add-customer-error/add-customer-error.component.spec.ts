import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerErrorComponent } from './add-customer-error.component';

describe('AddCustomerErrorComponent', () => {
  let component: AddCustomerErrorComponent;
  let fixture: ComponentFixture<AddCustomerErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
