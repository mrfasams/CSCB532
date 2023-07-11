import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../model/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Role} from '../model/role.model';
import {ROLES} from '../model/mock-roles';
import {CompanyService} from '../_services/company.service';
import {CompanyOfficeService} from '../_services/companyoffice.service';
import {Company} from '../model/company.model';
import {CompanyOffice} from '../model/companyoffice.model';
import { FormBuilder, FormArray} from '@angular/forms';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  form: FormGroup;
  constructor(private userService: UserService,
              private route: ActivatedRoute, private router: Router,
              private companyService: CompanyService,
              private companyOfficeService: CompanyOfficeService,
             ) {

  }
  id!: number;
  user: User = new User();
  selectedName!: string;
  isClient = false;

 public roles = ROLES;
  company: Company | undefined;
  companyOffice: CompanyOffice | undefined;
  companyOffices: CompanyOffice[] | undefined;


  selectedTeam = '';

  selectedRole: number;

  companies: Company[] | undefined;
  userCompaniesList: Company[];
  selectedCompany: number;
  selectedCompanyOffice: number;
  selectedCompanyList: number [];

  selectedItemsList = [];
  checkedIDs = [];

  private getUserById() {
    this.id = this.route.snapshot.params['id'];
    console.log('sdfsdfsdfsdf');
    this.userService.getUserById(this.id).subscribe({
      next: (data) => {
        this.user = data;

        this.selectedRole = this.user.roles[0].id;
        if (this.user.roles[0].name === 'ROLE_USER') {
          this.isClient = true;

        } else {
          this.getCompanyOffice(this.user.id);
        }

      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  ngOnInit(): void {
    this.getUserById();

    this.getAllCompany();
    console.log(this.user);
    //this.getAllClientCompanies(this.user.id);
    this.fetchSelectedItems();
  }

  updateUser() {
    this.user.officeId = this.selectedCompanyOffice;
    this.user.companyId = this.selectedCompany;
    this.user.clientBelongsToCompany = this.selectedCompanyList;
    console.log('user before company update ' );
    console.log( this.user);
    this.userService.updateUser(this.id, this.user).subscribe({
      next: (data) => {
        this.redirectToUserList();
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
  redirectToUserList() {
    this.router.navigate(['/home']);
  }
  onSubmit() {
    console.log(this.selectedRole);
    console.log(this.user);
    this.updateUser();
  }


  onSelected(newvalue): void {
    const newv = Number(newvalue);
    let current = 0;
    for (const num of this.roles) {
      if (num.id === newv) {
        this.user.roles.pop();
        this.user.roles.push( num);
      }
      current++;
    }
    if (newvalue !== '1') {
      this.isClient = false;
    } else {
      this.isClient = true;
    }

    this.selectedRole = newvalue;
  }



  onSelect(role: Role): void {
   // this.selectedRole = role;
    //this.user.roles.pop();
   // this.user.roles.push( this.selectedRole);
  }

  private getCompanyOffice(id: number) {
    this.companyOfficeService.getCompanyOfficeByUserId(id).subscribe({
      next: (data) => {
        this.companyOffice = data;
        this.getCompanyById(this.companyOffice.logisticCompanyId);
        this.selectedCompanyOffice = this.companyOffice.id;
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
        this.selectedCompany = this.company.id;
        this.getCompanyOffices(this.company.id);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  private getAllCompany() {
    this.id = this.route.snapshot.params['id'];
    this.companyService.getUserCompanyById2(this.id).subscribe(data => {
      this.companies = data;
      //this.getAllClientCompanies();
      if (this.selectedCompanyList === undefined) {
        this.selectedCompanyList = [];
      }
      for (const c of this.companies) {
        if (c.checked) {
        this.selectedCompanyList.push(c.id);
      }
      }
    });

  }

  private getAllClientCompanies() {
    this.id = this.route.snapshot.params['id'];
    this.companyService.getUserCompanyById2(this.id).subscribe(
      (com) => {
        this.userCompaniesList = com;
      }
    );

    console.log(this.userCompaniesList);
    console.log(this.selectedItemsList);
  }

  onSelectedCompanyOffice(newValue): void {
    console.log( newValue);
    console.log( this.selectedCompanyOffice);
    this.selectedCompanyOffice = newValue;
    this.user.officeId = newValue;

  }

  onSelectedCompany(newValue): void {
    console.log( newValue);
    console.log( this.selectedCompany);
    this.selectedCompanyOffice = undefined;
    this.user.companyId = newValue;
    this.selectedCompany = newValue;
    this.getCompanyOffices(newValue);
  }

  private getCompanyOffices(id: number) {
    this.companyOfficeService.getCompanyOfficeByCompanyId(id).subscribe({
      next: (data) => {
        this.companyOffices = data;
        console.log(data);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }


  onCheckboxChange(e, id: number) {
   // const website: FormArray = this.form.get('website') as FormArray;

    if (this.selectedCompanyList === undefined) {
      this.selectedCompanyList = [];
    }
    if (e) {
      this.selectedCompanyList.push(id);
    } else {
     const index = this.selectedCompanyList.findIndex(x => x === id);
     this.selectedCompanyList.splice(index, 1);
    }

  }


  changeSelection() {
    this.fetchSelectedItems();

  }
  private fetchSelectedItems() {
   /*this.selectedItemsList = this.userCompaniesList.filter((value, index) => {
     return value.isChecked;
    });*/
   console.log("tuk sme ole" + this.selectedItemsList);
  }


}
