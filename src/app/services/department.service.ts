import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Department } from '../classes/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseurl = 'http://localhost:8080/api/v1/departments';
  constructor(private httpClient: HttpClient,private http:HttpClient) { }

  getDepartmentList(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(`${this.baseurl}`);
  }

  createDepartment(department:Department):Observable<Object>{
    return this.httpClient.post(`${this.baseurl}`,department);
  }

  getDepartmentById(id:number):Observable<Department>{
    return this.httpClient.get<Department>(`${this.baseurl}/${id}`);
  }

  updateDepartment(id:number,department:Department):Observable<Object>{
    return this.httpClient.put(`${this.baseurl}/${id}`,department);
  }
  deleteDepartment(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseurl}/${id}`);
  }
}
