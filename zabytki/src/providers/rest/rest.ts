
import {HttpClientModule, HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthServiceProvider} from "../auth-service/auth-service";

@Injectable()
export class RestProvider {
  apiUrl = 'http://52.157.228.97:7050/';
  constructor(public authService: AuthServiceProvider, public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getMonuments() {
    return new Promise(resolve => {
        this.http.get(this.apiUrl+'monuments/all').subscribe(data => {
        resolve(data);
        },
      err => {
        console.log(err);
      });
    });
  }

  getNotApprovedMonuments() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'monuments',{
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.authService.getToken(),
        }),
        params: new HttpParams().set('approved', 'false')
      }).subscribe(data => {
          resolve(data);
        },
        err => {
          console.log(err);
        });
    });
  }

  markMonumentAsApproved(id) {
    return new Promise(resolve => {
      this.http.put(this.apiUrl+'monuments/approve/' + id + '/monument',{
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }).subscribe(data => {
          resolve(data);
        },
        err => {
          console.log(err);
        });
    });
  }

  addMonument(monuments) {
    console.log(JSON.stringify(monuments));
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'monuments/add', JSON.stringify(monuments), {
        headers: new HttpHeaders(
          {'Content-Type': 'application/json',
                   'Authorization': this.authService.getToken(),
                  }),
      }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  addUser(data) {
    return new Promise((resolve, reject) => {

      this.http.post(this.apiUrl+'user/register', JSON.stringify(data), {
        headers: new HttpHeaders(
          {'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
                  }),
      }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  logIn(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'user/log-in', JSON.stringify(data), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
}
