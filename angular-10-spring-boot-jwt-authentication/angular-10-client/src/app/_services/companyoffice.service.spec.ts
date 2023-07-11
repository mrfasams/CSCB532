import { TestBed } from '@angular/core/testing';

import {CompanyService} from './company.service';
import {CompanyOfficeService} from './companyoffice.service';

describe('CompanyOfficeService', () => {
  let service: CompanyOfficeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyOfficeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
