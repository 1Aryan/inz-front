import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { SearchUser } from '../_models/SearchUser';
import { URLSearchParams } from '@angular/http';
@Injectable()
export class SearchUserService {
  totalUsers:any;
  constructor(private http: Http){}

  public searchForUsers(searchUser: SearchUser){
    let url = "http://localhost:8080/search/users";
    let body = JSON.stringify(searchUser);
    console.log(body);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(url, body, {headers: headers})
.map((res) => { 
       this.totalUsers = res.headers.get('total');
       return res.json();
 } )
  
  }}

