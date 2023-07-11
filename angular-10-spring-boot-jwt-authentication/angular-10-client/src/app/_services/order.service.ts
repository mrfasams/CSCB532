import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Order} from '../model/order.model';
import {CompanyOffice} from '../model/companyoffice.model';

const API_URL = 'http://localhost:8080/api/test/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private basUrl = 'http://localhost:8080/api/order';
  constructor(private http: HttpClient) { }


  getOrderList(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.basUrl}`);
  }

  createOrder(order: Order): Observable<Object> {
    return this.http.post(`${this.basUrl}`, order);
  }

  getOrderById(id: number): Observable<Order>{
    return this.http.get<Order>(`${this.basUrl}/${id}`);
  }

  updateOrder(id: number, order: Order): Observable<Object>{
    console.log('update order');
    console.log(order);
    return this.http.put(`${this.basUrl}/${id}`, order);
  }

  deleteOrder(id: number): Observable<Object>{
    return this.http.delete(`${this.basUrl}/${id}`);
  }

  register(order): Observable<any> {
    return this.http.post(`${this.basUrl}register`, {
      id: order.id,
      description: order.description,
      recipient: order.recipient,
      sender: order.sender,
      weight: order.weight,
      receivedInOffice: order.receivedInOffice,
      senderUser : order.senderUserId,
      employee: order.employeeId,
      companyOffice : order.companyOfficeId,
      orderStatus : order.orderStatus,
      shippingAddress : order.shippingAddress,
      companyOfficeTo :  order.companyOfficeToId,
      receiverUser: order.receiverUserId
    }, httpOptions);
  }

  getOrderListByUserId(id: number): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.basUrl}/user/${id}`);
  }

  getOrderListByEmployeeId(id: number): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.basUrl}/employee/${id}`);
  }

  getOrderListOrdersNotReceivedForCompany(id: number): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.basUrl}/notreceived/${id}`);
  }

  getByOrdersByClientSend(id: number): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.basUrl}/clientsend/${id}`);
  }

  getByOrdersByClientReceived(id: number): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.basUrl}/clientReceived/${id}`);
  }

}
