import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import {UserRegisterComponent} from './user-register/user-register.component';
import {CompanyListComponent} from './company-list/company-list.component';
import {CompanyUpdateComponent} from './company-update/company-update.component';
import {CompanyRegisterComponent} from './company-register/company-register.component';
import {ReportsComponent} from './reports/reports.component';
import {ReportsEmployeesComponent} from './reports-employees/reports-employees.component';
import {ReportsClientsComponent} from './reports-clients/reports-clients.component';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderRegisterComponent} from './order-register/order-register.component';
import {OrderUpdateComponent} from './order-update/order-update.component';
import {UserUpdateComponent} from './user-update/user-update.component';
import {ReportsOrdersByEmployeeComponent} from './reports-orders-by-employee/reports-orders-by-employee.component';
import {ReportsOrdersNotReceivedComponent} from './reports-orders-not-received/reports-orders-not-received.component';
import {ReportsOrdersSendClientComponent} from './reports-orders-send-client/reports-orders-send-client.component';
import {ReportsOrdersReceivedClientComponent} from './reports-orders-received-client/reports-orders-received-client.component';
import {OfficeRegisterComponent} from './office-register/office-register.component';
import {OfficeListComponent} from './office-list/office-list.component';
import {OfficeUpdateComponent} from './office-update/office-update.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'update-user/:id', component: UserUpdateComponent },
  { path: 'companylist', component: CompanyListComponent },
  { path: 'update-company/:id', component: CompanyUpdateComponent },
  { path: 'register-company', component: CompanyRegisterComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'reports/reports-employees', component: ReportsEmployeesComponent },
  { path: 'reports/reports-clients', component: ReportsClientsComponent },
  { path: 'orderlist', component: OrderListComponent },
  { path: 'register-order', component: OrderRegisterComponent },
  { path: 'update-order/:id', component: OrderUpdateComponent },
  { path: 'register-user', component: UserRegisterComponent },
  { path: 'reports/reports-orders-by-employee', component: ReportsOrdersByEmployeeComponent },
  { path: 'reports/reports-orders-not-received', component: ReportsOrdersNotReceivedComponent },
  { path: 'reports/reports-orders-send-client', component: ReportsOrdersSendClientComponent },
  { path: 'reports/reports-orders-received-client', component: ReportsOrdersReceivedClientComponent },
  { path: 'office-register', component: OfficeRegisterComponent },
  { path: 'officelist', component: OfficeListComponent },
  { path: 'update-office/:id', component: OfficeUpdateComponent },








];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
