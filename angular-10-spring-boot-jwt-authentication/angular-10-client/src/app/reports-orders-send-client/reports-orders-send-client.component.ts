import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../model/user.model';
import {Order} from '../model/order.model';
import {OrderService} from '../_services/order.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './reports-orders-send-client.component.html',
  styleUrls: ['./reports-orders-send-client.component.css']
})
export class ReportsOrdersSendClientComponent implements OnInit {

  orders: Order[] | undefined;
  user: User;

  constructor(private orderService: OrderService, private router: Router, private tokenStorageService: TokenStorageService) {

  }

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders() {
    const id = this.tokenStorageService.getUser().id;
    this.user = this.tokenStorageService.getUser();
    console.log(id);
    this.orderService.getByOrdersByClientSend(id).subscribe(data => {
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
