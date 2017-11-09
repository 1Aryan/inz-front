import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Hall } from '../_models/hall';
import { URLSearchParams } from '@angular/http';
@Injectable()
export class HallService {
 
 totalHalls:any;

  constructor(private http: Http){}

  public addHall(hall: Hall){
    let url = "http://localhost:8080/add/hall";
    let body = JSON.stringify(hall);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, body, {headers: headers})
      .map(response => response.json())

   }


  public searchForHalls(hall : Hall){
    let url = "http://localhost:8080/search/halls";
    let body = JSON.stringify(hall);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, body, {headers: headers})
      .map((res) => { 
       this.totalHalls = res.headers.get('total');
       return res.json();
       })
  
   }

 }

