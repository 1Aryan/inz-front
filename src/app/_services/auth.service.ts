import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {UserLogin} from "../_models/UserLogin";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {

 

  constructor(private http: Http){}

  public login(user : UserLogin) {
    let url = "http://localhost:8080/auth";
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

   let data = {
      "email" : user.email,
      "password" : user.password
    }
    let body = JSON.stringify(data);

    return this.http.post(url, body, {headers: headers})
      .map(response => response.json());
  }

  public getUser(id) {
    console.log(id);
    let url = "http://localhost:8080/user/" + id;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');


    return this.http.get(url)
      .map(response => response.json());
  }


}