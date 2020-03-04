import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWorkdaysComponent } from './table-workdays.component';

describe('TableWorkdaysComponent', () => {
  let component: TableWorkdaysComponent;
  let fixture: ComponentFixture<TableWorkdaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableWorkdaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWorkdaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
