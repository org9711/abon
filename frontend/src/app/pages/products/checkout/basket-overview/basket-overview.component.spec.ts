import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketOverviewComponent } from './basket-overview.component';

describe('BasketOverviewComponent', () => {
  let component: BasketOverviewComponent;
  let fixture: ComponentFixture<BasketOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
