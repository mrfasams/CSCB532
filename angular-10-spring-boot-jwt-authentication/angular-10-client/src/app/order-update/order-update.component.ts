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
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'app-user-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.css']
})
export class OrderUpdateComponent implements OnInit {
  form: FormGroup;
  constructor(private userService: UserService,
              private route: ActivatedRoute, private router: Router,
              private companyService: CompanyService,
              private companyOfficeService: CompanyOfficeService,
              private orderService: OrderService, private tokenStorage: TokenStorageService
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
  selectedClient: number;
  selectedEmployee: number;
  selectedCompanyList: number [];

  selectedItemsList = [];
  checkedIDs = [];

  selectedStatus: string;
  selectedClientTo: number;
  selectedCompanyOfficeTo: number;


  ngOnInit(): void {
    this.getOrderById();
    const user = this.tokenStorage.getUser();
    this.getCompanyOffice(user.id);

  }


  private getOrderById() {
    this.id = this.route.snapshot.params['id'];
    this.orderService.getOrderById(this.id).subscribe({
      next: (data) => {
        this.order = data;
        console.log(this.order);
        this.selectedCompanyOffice = this.order.companyOffice.id;
        this.selectedClient = this.order.senderUser.id;
        this.selectedEmployee = this.order.employee.id;
        this.selectedClientTo = this.order.receiverUser.id;
        this.selectedCompanyOfficeTo = this.order.companyOfficeTo.id;
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
    this.order.companyOfficeId = this.selectedCompanyOffice;
    this.order.companyOfficeToId = this.selectedCompanyOfficeTo;
    this.order.receiverUserId = this.selectedClientTo;
    this.order.employeeId = this.order.employee.id;
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
    const user = this.tokenStorage.getUser();
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
    const user = this.tokenStorage.getUser();
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
    this.order.companyOfficeId = newValue;

  }

  onSelectedClient(newValue): void {
    this.selectedClient = newValue;
    this.order.senderUser = newValue;

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

  onSelectedStatus(value: string) {
    this.order.orderStatus = value;
  }

  onSelectedCompanyOfficeTo(newValue): void {
    this.selectedCompanyOfficeTo = newValue;
    this.order.companyOfficeToId = newValue;
  }

  onSelectedClientTo(newValue): void {
    this.selectedClientTo = newValue;
    this.order.receiverUserId = newValue;

  }
}
