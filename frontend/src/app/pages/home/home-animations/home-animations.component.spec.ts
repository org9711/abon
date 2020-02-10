import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAnimationsComponent } from './home-animations.component';

describe('HomeAnimationsComponent', () => {
  let component: HomeAnimationsComponent;
  let fixture: ComponentFixture<HomeAnimationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAnimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
