import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlybuttonInnerCancelComponent } from './flybutton-inner-cancel.component';

describe('FlybuttonInnerCancelComponent', () => {
  let component: FlybuttonInnerCancelComponent;
  let fixture: ComponentFixture<FlybuttonInnerCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlybuttonInnerCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlybuttonInnerCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
