import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payroll } from '../classes/payroll';
@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  private baseurl = 'http://localhost:8080/api/v1/payrolls';
  constructor(private httpClient: HttpClient,private http: HttpClient) {}

  getPayrollList(): Observable<Payroll[]> {
    return this.httpClient.get<Payroll[]>(`${this.baseurl}`);
  }

  // observable of payroll object
  updatePayroll(id:number,payroll:Payroll):Observable<Object>{
    return this.httpClient.put(`${this.baseurl}/${id}`,payroll);
  }

  getPayrollById(id:number):Observable<Payroll>{
    return this.httpClient.get<Payroll>(`${this.baseurl}/${id}`);
  }

}
