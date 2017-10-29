import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Hall } from '../_models/hall';
import { URLSearchParams } from '@angular/http';
@Injectable()
export class HallService {
 

  constructor(private http: Http){}

  public addHall(hall: Hall){
    let url = "http://localhost:8080/add/hall";
    let body = JSON.stringify(hall);
  
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log(Hall);
    console.log(body);
    return this.http.post(url, body, {headers: headers})
      .map(response => response.json())

   }

  }

