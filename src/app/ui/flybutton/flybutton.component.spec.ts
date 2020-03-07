import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlybuttonComponent } from './flybutton.component';

describe('FlybuttonComponent', () => {
  let component: FlybuttonComponent;
  let fixture: ComponentFixture<FlybuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlybuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlybuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
