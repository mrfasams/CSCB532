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
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.css']
})
export class OfficeListComponent implements OnInit {

  companies: CompanyOffice[] | undefined;

  company: CompanyOffice | undefined;

  constructor(private companyService: CompanyOfficeService, private router: Router) {

  }

  ngOnInit(): void {
    this.getAllCompany();
  }

  private getAllCompany() {
    this.companyService.getCompanyOfficeList().subscribe(data => {
      this.companies = data;
    });
  }

  updateOffice(id: number) {
    this.router.navigate(['update-office', id]);
  }

  deleteOffice(id: number) {
    this.companyService.deleteCompanyOffice(id).subscribe(data => {
      this.getAllCompany();
    });
  }

  registerCompany() {
    this.router.navigate(['office-register']);
  }
}
