import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipeTimePickerComponent } from './swipe-time-picker.component';

describe('SwipeTimePickerComponent', () => {
  let component: SwipeTimePickerComponent;
  let fixture: ComponentFixture<SwipeTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwipeTimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipeTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
