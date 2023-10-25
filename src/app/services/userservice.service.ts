import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http: HttpClient) {

  }
  
 getUserdata(email: string,password: string){
  return this.http.get('http://localhost:8080/users/'+email+'/'+password);
 }

   
}
