import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WiggleComponent } from './wiggle.component';

describe('WiggleComponent', () => {
  let component: WiggleComponent;
  let fixture: ComponentFixture<WiggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WiggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WiggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
