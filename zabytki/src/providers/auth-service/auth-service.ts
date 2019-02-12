import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from "ionic-angular";
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class User {
  login: string;
  token: string;
  superUser: boolean;

  constructor(login: string, token: string, superUser: boolean) {
    this.login = login;
    this.token = token;
    this.superUser = superUser
  }
}

@Injectable()
export class AuthServiceProvider {
  currentUser: User;

  constructor(public events: Events, public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }

  public login(login: string, token: string, isSuperUser: boolean) {
    this.currentUser = new User(login, token, isSuperUser);
    this.events.publish('user:created', this.currentUser.superUser, Date.now());
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public getToken() : string {
    return this.currentUser.token;
  }

  public logout() {
    this.currentUser = null;
    this.events.publish('user:logout', Date.now());
  }
}
