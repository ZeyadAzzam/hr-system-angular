  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { Employee } from '../classes/employee';

  @Injectable({
    providedIn: 'root',
  })
  export class EmployeeService {
    private baseurl = 'http://localhost:8080/api/v1/employees';
    constructor(private httpClient: HttpClient,private http: HttpClient) {}

    getEmployeeList(): Observable<Employee[]> {
      return this.httpClient.get<Employee[]>(`${this.baseurl}`);
    }

    createEmployee(employee:Employee):Observable<Object>{

      return this.httpClient.post(`${this.baseurl}`,employee);
      
    }

    getEmployeeById(id:number):Observable<Employee>{
      return this.httpClient.get<Employee>(`${this.baseurl}/${id}`);
    }

    updateEmployee(id:number,employee:Employee):Observable<Object>{
      return this.httpClient.put(`${this.baseurl}/${id}`,employee);
    }

    deleteEmployee(id:number): Observable<Object> {
      return this.httpClient.delete(`${this.baseurl}/${id}`);    
      }

     
  }
