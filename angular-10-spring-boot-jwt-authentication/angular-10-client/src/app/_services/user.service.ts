import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../model/user.model';

const API_URL = 'http://localhost:8080/api/test/';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private basUrl = 'http://localhost:8080/api/users';
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.basUrl}`);
  }

  createUser(user: User): Observable<Object> {
    return this.http.post(`${this.basUrl}`, user);
  }

  getUserById(id: number): Observable<User>{
    return this.http.get<User>(`${this.basUrl}/${id}`);
  }

  updateUser(id: number, user: User): Observable<Object>{
    return this.http.put(`${this.basUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<Object>{
    return this.http.delete(`${this.basUrl}/${id}`);
  }

  loginUser(user: User): Observable<Object>{
    return this.http.post(`${this.basUrl}/login`, user);
  }
}
