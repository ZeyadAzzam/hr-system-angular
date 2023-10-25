import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../classes/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseurl = 'http://localhost:8080/api/v1/projects';
  constructor(private httpClient: HttpClient,private http: HttpClient) {}


  getProjectList(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${this.baseurl}`);
  }

  createProject(project:Project):Observable<Object>{
    return this.httpClient.post(`${this.baseurl}`,project);
  }


  getProjectById(id:number):Observable<Project>{
    return this.httpClient.get<Project>(`${this.baseurl}/${id}`);
  }

  updateProject(id:number,project:Project):Observable<Object>{
    return this.httpClient.put(`${this.baseurl}/${id}`,project);
  }

  deleteProject(id:number): Observable<Object> {
    return this.httpClient.delete(`${this.baseurl}/${id}`);
  }
}
