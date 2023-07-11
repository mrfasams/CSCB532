import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../model/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Role} from '../model/role.model';
import {ROLES} from '../model/mock-roles';
import {CompanyService} from '../_services/company.service';
import {Company} from '../model/company.model';

@Component({
  selector: 'app-user-update',
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.css']
})
export class CompanyUpdateComponent implements OnInit {

  constructor(private companyService: CompanyService,
              private route: ActivatedRoute, private router: Router) { }
  id!: number;
  company: Company = new Company();
  selectedName!: string;

 public roles = ROLES;


  selectedTeam = '';

  selectedRole?: Role;

  private getCompanyById() {
    this.id = this.route.snapshot.params['id'];
    this.companyService.getCompanyById(this.id).subscribe({
      next: (data) => {
        this.company = data;
        console.log(data);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  ngOnInit(): void {
    this.getCompanyById();
    console.log(this.company);
  }

  updateCompany() {
    this.companyService.updateCompany(this.id, this.company).subscribe({
      next: (data) => {
        this.redirectToCompanyList();
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
  redirectToCompanyList() {
    this.router.navigate(['/companylist']);
  }
  onSubmit() {
    this.updateCompany();
  }
}
