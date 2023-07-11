import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../model/user.model';
import {Company} from '../model/company.model';
import {CompanyService} from '../_services/company.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companies: Company[] | undefined;

  company: Company | undefined;

  constructor(private companyService: CompanyService, private router: Router) {

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

  deleteCompany(id: number) {
    this.companyService.deleteCompany(id).subscribe(data => {
      this.getAllCompany();
    });
  }

  registerCompany() {
    this.router.navigate(['register-company']);
  }
}
