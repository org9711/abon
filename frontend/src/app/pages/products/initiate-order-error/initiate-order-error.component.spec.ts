import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateOrderErrorComponent } from './initiate-order-error.component';

describe('InitiateOrderErrorComponent', () => {
  let component: InitiateOrderErrorComponent;
  let fixture: ComponentFixture<InitiateOrderErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiateOrderErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiateOrderErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
