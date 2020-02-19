import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDistanceInfoComponent } from './order-distance-info.component';

describe('OrderDistanceInfoComponent', () => {
  let component: OrderDistanceInfoComponent;
  let fixture: ComponentFixture<OrderDistanceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDistanceInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDistanceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
