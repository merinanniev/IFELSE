import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
  baseURL = 'https://1.api.fy23ey04.careers.ifelsecloud.com/'

  constructor(private http:HttpClient) { }

  getTeamMembers(): Observable<any> {
    const url = `${this.baseURL}`;
    return this.http.get(url);
  }
}
