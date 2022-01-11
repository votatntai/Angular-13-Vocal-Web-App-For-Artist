import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;

  private user = new Subject<User>();

  constructor(private http: HttpClient) { }

  public getUser(): Observable<User> {
    return this.user.asObservable();
  }

  public updateUser(user: User): void {
    this.user.next(user);
  }

  get currentUser() {
    return localStorage.getItem('USER');
  }

  signIn(username: string, password: string) {
    var artist = {
      username: username,
      password: password
    }
    return this.http.post(this.baseUrl + '/api/v1/authenticate/artist', artist);
  }

  changePassword(email: string, password: string) {
    var change = {
      email: email,
      password: password
    }
    return this.http.put(this.baseUrl + '/api/v1/artists/password', change, { observe: 'response' });
  }
}
