import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/User';

@Injectable()
export class UserService {

  constructor(private http: Http){}

  public createPlayer(user: User){
    let url = "http://localhost:8080/user";
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(url, body, {headers: headers})
      .map(response => response.json())
  }
}