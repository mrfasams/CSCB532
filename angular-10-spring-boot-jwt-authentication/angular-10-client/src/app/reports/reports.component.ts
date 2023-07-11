import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../model/user.model';
import {Company} from '../model/company.model';
import {CompanyService} from '../_services/company.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {Role} from '../model/role.model';
import {CompanyOffice} from '../model/companyoffice.model';
import {CompanyOfficeService} from '../_services/companyoffice.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  companies: Company[] | undefined;

  company: Company | undefined;
  isLoggedIn = false;
  user: User | undefined;
  showEmployee = false;
  showCourier = false;
  showClient = false;
  roles!: Role[];
  officeId: number;
  companyOffice: CompanyOffice | undefined;
  constructor(private companyService: CompanyService, private router: Router,
              private tokenStorageService: TokenStorageService,
              private userService: UserService,
              private companyOfficeService: CompanyOfficeService) {

  }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showClient = this.roles.includes('ROLE_USER');
      this.showEmployee = this.roles.includes('ROLE_EMPLOYEE');
      this.showCourier = this.roles.includes('ROLE_COURIER');

    }
    if (!this.showClient) {
      this.getUserCompany();
    }
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

  getUserCompany() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.getUserById(user.id);
    }
  }

  private getUserById(id: number) {
    this.userService.getUserById(id).subscribe({
      next: (data) => {
        this.user = data;
        console.log(this.user);
        this.roles = this.user.roles;
        const currentRole = this.user.roles[0].name;
        this.isClient = currentRole === 'ROLE_USER';
        this.isCourier = currentRole === 'ROLE_COURIER' ;
        this.isEmployee = currentRole === 'ROLE_EMPLOYEE';
        this.officeId = this.user.officeId;
        this.getCompanyOffice(this.user.id);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  private getCompanyOffice(id: number) {
    this.companyOfficeService.getCompanyOfficeByUserId(id).subscribe({
      next: (data) => {
        this.companyOffice = data;
        this.getCompanyById(this.companyOffice.logisticCompanyId);
        console.log(data);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  private getCompanyById(id: number) {
    this.companyService.getCompanyById(id).subscribe({
      next: (data) => {
        this.company = data;
        console.log(data);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}
