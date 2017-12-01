import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { MsgToAdmin} from '../_models/MsgToAdmin';
import { MsgFromAdmin} from '../_models/MsgFromAdmin';
@Injectable()
export class AdminService {
  
   
  
  constructor(private http: Http){}

  public contactAdmin(msg : MsgToAdmin){
    
    let url = "http://localhost:8080/msg";
    let body = JSON.stringify(msg);
    let headers = new Headers();
    console.log(body);
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, body, {headers: headers})
      .map((res) => { 
        return res.json();
       })
  }

public getMsgs() {
    let url = "http://localhost:8080/getmsg";
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url)
      .map(response => response.json());
  }

public getInactiveHalls() {
    let url = "http://localhost:8080/halls/inactive";
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url)
      .map(response => response.json());
  }


public answerMsg(msg: MsgFromAdmin){
    
    let url = "http://localhost:8080/answer";
    let body = JSON.stringify(msg);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, body, {headers: headers})
      .map((res) => { 
        return res.json();
       })
  }

public deleteMsg(msg: MsgFromAdmin){
    
    let url = "http://localhost:8080/delete/msg";
    let body = JSON.stringify(msg);
    console.log(body);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, body, {headers: headers})
      .map((res) => { 
        return res.json();
       })
  }
public activateHall(id){
  let url = "http://localhost:8080/halls/activate/" + id;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url)
      .map(response => response.json());

}

public deleteHall(id){
  let url = "http://localhost:8080/halls/delete/" + id;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url)
      .map(response => response.json());

}

}

