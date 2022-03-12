import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = environment.baseUrl;

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = this.getHttpHeaders();
  }

  private getHttpHeaders(): HttpHeaders {
    var data = localStorage.getItem('USER');
    var headers = new HttpHeaders();
    if (data) {
      var user: User = JSON.parse(data);
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + user.token);
    }
    return headers;
  }

  getArtistProject(pageNumber: number, pageSize: number, isAsc: boolean, isProcess: boolean) {
    return this.http.get(this.baseUrl + '/api/v1/projects/own/', {
      observe: 'response', headers: this.httpHeaders,
      params: { pageNumber: pageNumber, pageSize: pageSize, isAsc: isAsc, isProcess: isProcess }
    });
  }

  getProjectDetail(id: string) {
    return this.http.get(this.baseUrl + '/api/v1/projects/' + id, { observe: 'response', headers: this.httpHeaders });
  }
}
