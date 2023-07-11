import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeRegisterComponent } from './office-register.component';

describe('UserListComponent', () => {
  let component: OfficeRegisterComponent;
  let fixture: ComponentFixture<OfficeRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
