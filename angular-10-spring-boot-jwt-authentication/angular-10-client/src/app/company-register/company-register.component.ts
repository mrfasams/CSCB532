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
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent implements OnInit {

  constructor(private companyService: CompanyService,
              private route: ActivatedRoute, private router: Router) { }
  id!: number;
  company: Company = new Company();
  selectedName!: string;

 public roles = ROLES;


  selectedTeam = '';

  selectedRole?: Role;

  ngOnInit(): void {
  }

  registerCompany() {
    this.companyService.register(this.company).subscribe({
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
    this.registerCompany();
  }
}
