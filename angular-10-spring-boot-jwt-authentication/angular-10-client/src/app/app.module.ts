import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import {UserListComponent} from './user-list/user-list.component';
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



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    UserListComponent,
    UserRegisterComponent,
    CompanyListComponent,
    CompanyUpdateComponent,
    CompanyRegisterComponent,
    ReportsComponent,
    ReportsEmployeesComponent,
    ReportsClientsComponent,
    OrderListComponent,
    OrderRegisterComponent,
    OrderUpdateComponent,
    UserRegisterComponent,
    UserUpdateComponent,
    ReportsOrdersByEmployeeComponent,
    ReportsOrdersNotReceivedComponent,
    ReportsOrdersSendClientComponent,
    ReportsOrdersReceivedClientComponent,
    OfficeRegisterComponent,
    OfficeListComponent,
    OfficeUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
