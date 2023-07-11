import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsOrdersSendClientComponent } from './reports-orders-send-client.component';

describe('ReportsOrdersByEmployeeComponent', () => {
  let component: ReportsOrdersSendClientComponent;
  let fixture: ComponentFixture<ReportsOrdersSendClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsOrdersSendClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsOrdersSendClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
