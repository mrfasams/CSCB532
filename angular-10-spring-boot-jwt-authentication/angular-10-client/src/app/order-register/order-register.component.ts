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
import {OrderService} from '../_services/order.service';
import {Order} from '../model/order.model';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './order-register.component.html',
  styleUrls: ['./order-register.component.css']
})
export class OrderRegisterComponent implements OnInit {
  form: FormGroup;
  constructor(private userService: UserService,
              private route: ActivatedRoute, private router: Router,
              private companyService: CompanyService,
              private companyOfficeService: CompanyOfficeService,
              private orderService: OrderService, private tokenStorageService: TokenStorageService
             ) {

  }
  id!: number;
  user: User = new User();
  order: Order = new Order();
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
  selectedCompanyOfficeTo: number;
  selectedClient: number;
  selectedEmployee: number;
  selectedCompanyList: number [];
  selectedClientTo: number;

  selectedItemsList = [];
  checkedIDs = [];

  private getOrderById() {
    this.id = this.route.snapshot.params['id'];
    this.orderService.getOrderById(this.id).subscribe({
      next: (data) => {
        this.order = data;

      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  ngOnInit(): void {
   // this.getOrderById();
    const user = this.tokenStorageService.getUser();
    this.getCompanyOffice(user.id);


  }

  updateOrder() {
    this.orderService.updateOrder(this.id, this.order).subscribe({
      next: (data) => {
        this.redirectToOrderList();
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
  redirectToOrderList() {
    this.router.navigate(['/orderlist']);
  }
  onSubmit() {
    this.registerOrder();
  }

  registerOrder() {
    this.order.senderUserId = this.selectedClient;
    this.order.employeeId = this.tokenStorageService.getUser().id;
    this.order.companyOfficeId = this.selectedCompanyOffice;
    this.order.companyOfficeToId = this.selectedCompanyOfficeTo;
    this.order.receiverUserId = this.selectedClientTo;
    console.log(this.order);
    this.orderService.register(this.order).subscribe({
      next: (data) => {
        this.redirectToOrderList();
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
    const user = this.tokenStorageService.getUser();
    console.log(user);
    this.companyService.getUserCompanyById2(user.id).subscribe(data => {
      this.companies = data;
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
    const user = this.tokenStorageService.getUser();
    console.log(user);
    this.companyService.getUserCompanyById(user.id).subscribe(
      (com) => {
        this.userCompaniesList = com;
      }
    );

  }

  onSelectedCompanyOffice(newValue): void {
    console.log( newValue);
    console.log( this.selectedCompanyOffice);
    this.selectedCompanyOffice = newValue;
    this.user.officeId = newValue;

  }
  onSelectedCompanyOfficeTo(newValue): void {
    this.selectedCompanyOfficeTo = newValue;
    this.order.companyOfficeToId = newValue;
  }

  onSelectedClient(newValue): void {
    this.selectedClient = newValue;
    this.order.senderUser = newValue;

  }
  onSelectedClientTo(newValue): void {
    this.selectedClientTo = newValue;
    this.order.receiverUserId = newValue;

  }

  onSelectedEmployee(newValue): void {
    this.selectedEmployee = newValue;
    this.order.employee = newValue;

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


}
