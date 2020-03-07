import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlybuttonInnerComponent } from './flybutton-inner.component';

describe('FlybuttonInnerComponent', () => {
  let component: FlybuttonInnerComponent;
  let fixture: ComponentFixture<FlybuttonInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlybuttonInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlybuttonInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
