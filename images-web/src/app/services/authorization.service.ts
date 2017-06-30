import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { User } from '../models/user';

@Injectable()
export class AuthorizationService {
  subject: Subject<boolean> = new Subject<boolean>();

  constructor(private http: Http) {
    this.subject.next(this.loggedIn());
  }

  login(user: User) {
    return this.http.post('http://localhost:3000/users/login', user)
      .map(res => { return res.json() });
  }

  register(user: User) {
    return this.http.post('http://localhost:3000/users/user', user)
      .map(res => { return res.json() });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.subject.next(this.loggedIn());
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logOut() {
    localStorage.removeItem('token');
    this.subject.next(this.loggedIn());
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
