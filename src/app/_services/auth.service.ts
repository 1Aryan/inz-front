import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {UserLogin} from "../_models/UserLogin";


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
}