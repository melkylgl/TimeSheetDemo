import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipeButtonInnerComponent } from './swipe-button-inner.component';

describe('SwipeButtonInnerComponent', () => {
  let component: SwipeButtonInnerComponent;
  let fixture: ComponentFixture<SwipeButtonInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwipeButtonInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipeButtonInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
