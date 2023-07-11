import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsOrdersByEmployeeComponent } from './reports-orders-by-employee.component';

describe('ReportsOrdersByEmployeeComponent', () => {
  let component: ReportsOrdersByEmployeeComponent;
  let fixture: ComponentFixture<ReportsOrdersByEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsOrdersByEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsOrdersByEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
