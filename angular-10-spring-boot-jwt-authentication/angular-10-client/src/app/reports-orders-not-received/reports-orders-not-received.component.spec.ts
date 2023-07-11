import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsOrdersNotReceivedComponent } from './reports-orders-not-received.component';

describe('ReportsOrdersByEmployeeComponent', () => {
  let component: ReportsOrdersNotReceivedComponent;
  let fixture: ComponentFixture<ReportsOrdersNotReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsOrdersNotReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsOrdersNotReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
