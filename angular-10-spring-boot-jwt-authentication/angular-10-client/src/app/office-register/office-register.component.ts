import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../model/user.model';
import {Company} from '../model/company.model';
import {CompanyService} from '../_services/company.service';
import {CompanyOffice} from '../model/companyoffice.model';
import {CompanyOfficeService} from '../_services/companyoffice.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './office-register.component.html',
  styleUrls: ['./office-register.component.css']
})
export class OfficeRegisterComponent implements OnInit {

  companies: Company[] | undefined;

  company: Company | undefined;

  companyOffice: CompanyOffice | undefined;

  selectedCompany: number;

  officeName: string | undefined;

  constructor(private companyService: CompanyService, private companyOfficeService: CompanyOfficeService, private router: Router) {

  }

  ngOnInit(): void {
    this.getAllCompany();
  }

  private getAllCompany() {
    this.companyService.getCompanyList().subscribe(data => {
      this.companies = data;
    });
  }

  updateCompany(id: number) {
    this.router.navigate(['update-company', id]);
  }

  deleteOffice(id: number) {
    this.companyService.deleteCompany(id).subscribe(data => {
      this.getAllCompany();
    });
  }

  registerOffice() {
    this.companyOffice = new CompanyOffice();
    this.companyOffice.name = this.officeName;
    this.companyOffice.logisticCompanyId = this.selectedCompany;
    this.companyOfficeService.registerOffice(this.companyOffice).subscribe({
      next: (data) => {
        this.redirectToOfficeList();
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  onSelectedCompany(newValue): void {
    this.selectedCompany = newValue;
  }

  onSubmit() {
    this.registerOffice();
  }

  redirectToOfficeList() {
    this.router.navigate(['/officelist']);
  }
}
