import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/User';
import { URLSearchParams } from '@angular/http';
import { TeamInvitation } from '../_models/TeamInvitation';

@Injectable()
export class UserService {

  constructor(private http: Http){}

  public createUser(user: User){
    let url = "http://localhost:8080/user";
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, body, {headers: headers})
      .map(response => response.json())
  }
  
  public editProfile(user : User){
  	let url = "http://localhost:8080/edit/user";
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, body, {headers: headers})
      .map(response => response.json())
  }

 public getUser(id) {
    
    let url = "http://localhost:8080/user/" + id;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url)
      .map(response => response.json());
  }

  public getPassword(id) {
    let url = "http://localhost:8080/user/retrieve/" + id;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url)
      .map(response => response.json());
  }

public getMatchInvitations(id) {
    let url = "http://localhost:8080/match/invites/" + id;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url)
      .map(response => response.json());
  }

  public editSalary(id,salary) {
    let url = "http://localhost:8080/user/salary/" + id +"/"+ salary;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url)
      .map(response => response.json());
  }

   public acceptInvitation(idPlayer,idTeam) {
    let url = "http://localhost:8080/invitation/accept/" + idPlayer +"/"+ idTeam;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url)
      .map(response => response.json());
  }

    public denyInvitation(idPlayer,idTeam) {
    let url = "http://localhost:8080/invitation/deny/" + idPlayer +"/"+ idTeam;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url)
      .map(response => response.json());
  }

  public createTeam(id,team){
 	let url = "http://localhost:8080/create/team/" + id;
    let body = JSON.stringify(team);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, body, {headers: headers})
      .map(response => response.json())

  }

  public inviteToTeam(teamInvitation:TeamInvitation){
  let url = "http://localhost:8080/invite/team";
    let body = JSON.stringify(teamInvitation);
    let headers = new Headers();
    console.log(body);
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, body, {headers: headers})
      .map(response => response.json())
  }

  removePlayerFromTeam(id){
 let url = "http://localhost:8080/team/remove/player/"+id;
    let headers = new Headers();
    
    headers.append('Content-Type', 'application/json');
    return this.http.get(url)
      .map(response => response.json());
  }
  public getInvitations(id){
     let url = "http://localhost:8080/invitation/player/" + id;
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.get(url)
      .map(response => response.json());
  }

  public leaveTeam(id){
      let url = "http://localhost:8080/team/leave/" + id;
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.get(url)
      .map(response => response.json());
  }
}