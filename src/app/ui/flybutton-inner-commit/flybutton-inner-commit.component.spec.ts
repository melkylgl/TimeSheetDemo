import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlybuttonInnerCommitComponent } from './flybutton-inner-commit.component';

describe('FlybuttonInnerCommitComponent', () => {
  let component: FlybuttonInnerCommitComponent;
  let fixture: ComponentFixture<FlybuttonInnerCommitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlybuttonInnerCommitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlybuttonInnerCommitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
