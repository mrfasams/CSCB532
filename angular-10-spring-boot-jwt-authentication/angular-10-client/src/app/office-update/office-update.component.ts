import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../model/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Role} from '../model/role.model';
import {ROLES} from '../model/mock-roles';
import {CompanyService} from '../_services/company.service';
import {Company} from '../model/company.model';
import {CompanyOffice} from '../model/companyoffice.model';
import {CompanyOfficeService} from '../_services/companyoffice.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './office-update.component.html',
  styleUrls: ['./office-update.component.css']
})
export class OfficeUpdateComponent implements OnInit {

  companies: Company[] | undefined;

  company: Company | undefined;

  companyOffice: CompanyOffice | undefined;

  selectedCompany: number;

  officeName: string | undefined;
  id: number;

  constructor(private companyService: CompanyService, private companyOfficeService: CompanyOfficeService,  private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.getAllCompany();
    this.getOfficeById();
  }

  private getAllCompany() {
    this.companyService.getCompanyList().subscribe(data => {
      this.companies = data;
    });
  }

  updateCompany(id: number) {
    this.router.navigate(['update-company', id]);
  }



  updateOffice() {
    this.companyOffice.name = this.officeName;
    this.companyOffice.logisticCompanyId = this.selectedCompany;
    this.companyOfficeService.updateCompanyOffice(this.companyOffice.id,this.companyOffice).subscribe({
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
    this.updateOffice();
  }

  redirectToOfficeList() {
    this.router.navigate(['/officelist']);
  }

  private getOfficeById() {
    this.id = this.route.snapshot.params['id'];
    this.companyOfficeService.getCompanyOfficeById(this.id).subscribe({
      next: (data) => {
        this.companyOffice = data;
        this.selectedCompany = this.companyOffice.logisticCompanyId;
        this.officeName = this.companyOffice.name;
        console.log(data);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}
