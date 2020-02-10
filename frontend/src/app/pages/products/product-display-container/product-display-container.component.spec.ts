import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDisplayContainerComponent } from './product-display-container.component';

describe('ProductDisplayContainerComponent', () => {
  let component: ProductDisplayContainerComponent;
  let fixture: ComponentFixture<ProductDisplayContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDisplayContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDisplayContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
