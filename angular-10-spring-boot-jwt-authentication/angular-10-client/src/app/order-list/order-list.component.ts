import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../model/user.model';
import {Order} from '../model/order.model';
import {OrderService} from '../_services/order.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {Role} from '../model/role.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[] | undefined;

  user: User | undefined;
  showEmployee = false;
  showCourier = false;
  showClient = false;
  roles!: Role[];

  constructor(private orderService: OrderService, private router: Router, private tokenStorageService: TokenStorageService) {

  }

  ngOnInit(): void {
    this.getOrders();

    this.user = this.tokenStorageService.getUser();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showClient = this.roles.includes('ROLE_USER');
      this.showEmployee = this.roles.includes('ROLE_EMPLOYEE');
      this.showCourier = this.roles.includes('ROLE_COURIER');

    }
  }

  private getOrders() {
   /* this.orderService.getOrderList().subscribe(data => {
      this.orders = data;
    });*/
    const id = this.tokenStorageService.getUser().id;
    console.log(id);
    this.orderService.getOrderListByUserId(id).subscribe(data => {
      this.orders = data;
    });
  }

  updateOrder(id: number) {
    this.router.navigate(['update-order', id]);
  }

  deleteOrder(id: number) {
    this.orderService.deleteOrder(id).subscribe(data => {
      this.getOrders();
    });
  }

  registerOrder() {
    this.router.navigate(['register-order']);
  }
}
