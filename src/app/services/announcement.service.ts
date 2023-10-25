import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Announcement } from '../classes/announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private baseurl = 'http://localhost:8080/api/v1/announcements';
  constructor(private http: HttpClient,private httpClient: HttpClient) { }


  getAnnouncementList(): Observable<Announcement[]> {
    return this.httpClient.get<Announcement[]>(`${this.baseurl}`);
  }

  createAnnouncement(announcement:Announcement):Observable<Object>{
    return this.httpClient.post(`${this.baseurl}`,announcement);
  }

  getAnnouncementById(id:number):Observable<Announcement>{
    return this.httpClient.get<Announcement>(`${this.baseurl}/${id}`);
  }

  updateAnnouncement(id:number,announcement:Announcement):Observable<Object>{
    return this.httpClient.put(`${this.baseurl}/${id}`,announcement);
  }
  deleteAnnouncement(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseurl}/${id}`);
  }


}
