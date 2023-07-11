import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../model/user.model';
import {Company} from '../model/company.model';

const API_URL = 'http://localhost:8080/api/test/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private basUrl = 'http://localhost:8080/api/company';
  constructor(private http: HttpClient) { }

  getCompanyList(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.basUrl}`);
  }

  deleteCompany(id: number): Observable<Object>{
    return this.http.delete(`${this.basUrl}/${id}`);
  }

  register(company): Observable<any> {
    return this.http.post(`${this.basUrl}`, {
      name: company.name,
    }, httpOptions);
  }

  updateCompany(id: number, company: Company): Observable<Object>{
    return this.http.put(`${this.basUrl}/${id}`, company);
  }

  getCompanyById(id: number): Observable<Company>{
    return this.http.get<Company>(`${this.basUrl}/${id}`);
  }

  getUserCompanyById(userid: number): Observable<Company[]>{
    return this.http.get<Company[]>(`${this.basUrl}/user/${userid}`);
  }

  getUserCompanyById2(userid: number): Observable<Company[]>{
    return this.http.get<Company[]>(`${this.basUrl}/user2/${userid}`);
  }
}
