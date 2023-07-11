import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../model/user.model';
import {Company} from '../model/company.model';
import {CompanyOffice} from '../model/companyoffice.model';

const API_URL = 'http://localhost:8080/api/test/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CompanyOfficeService {
  private basUrl = 'http://localhost:8080/api/companyoffice';
  constructor(private http: HttpClient) { }

  getCompanyOfficeList(): Observable<CompanyOffice[]> {
    return this.http.get<CompanyOffice[]>(`${this.basUrl}`);
  }

  deleteCompanyOffice(id: number): Observable<Object>{
    return this.http.delete(`${this.basUrl}/${id}`);
  }

  registerOffice(company): Observable<any> {
    return this.http.post(`${this.basUrl}`, {
      name: company.name,
      logisticCompanyId : company.logisticCompanyId
    }, httpOptions);
  }

  updateCompanyOffice(id: number, company: CompanyOffice): Observable<Object>{
    return this.http.put(`${this.basUrl}/${id}`, company);
  }

  getCompanyOfficeById(id: number): Observable<CompanyOffice>{
    return this.http.get<CompanyOffice>(`${this.basUrl}/${id}`);
  }

  getCompanyOfficeByUserId(id: number): Observable<CompanyOffice>{
    return this.http.get<CompanyOffice>(`${this.basUrl}/user/${id}`);
  }

  getCompanyOfficeByCompanyId(id: number): Observable<CompanyOffice[]>{
    return this.http.get<CompanyOffice[]>(`${this.basUrl}/company/${id}`);
  }
}
