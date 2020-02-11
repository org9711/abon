import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketRowComponent } from './basket-row.component';

describe('BasketRowComponent', () => {
  let component: BasketRowComponent;
  let fixture: ComponentFixture<BasketRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
