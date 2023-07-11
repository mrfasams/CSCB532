import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsOrdersReceivedClientComponent } from './reports-orders-received-client.component';

describe('ReportsOrdersByEmployeeComponent', () => {
  let component: ReportsOrdersReceivedClientComponent;
  let fixture: ComponentFixture<ReportsOrdersReceivedClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsOrdersReceivedClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsOrdersReceivedClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
