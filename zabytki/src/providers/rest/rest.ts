
import {HttpClientModule, HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestProvider {
  apiUrl = 'http://52.236.144.147:7050/';
  constructor(public http: HttpClient) {
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
  addMonument(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'monuments/add', JSON.stringify(data), {
        headers: new HttpHeaders().set('Authorization', 'my-auth-token'),
      })
        .subscribe(res => {
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
