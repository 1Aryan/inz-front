import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { MatchInvitation } from '../_models/MatchInvitation';
import { URLSearchParams } from '@angular/http';
import { TeamInvitation } from '../_models/TeamInvitation';

@Injectable()
export class MatchService {

  constructor(private http: Http){}

  public inviteToMatch(matchInv: MatchInvitation){
    let url = "http://localhost:8080/match/invite";
    let body = JSON.stringify(matchInv);
    let headers = new Headers();
    console.log( "Body of match inv :  "+body);
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, body, {headers: headers})
      .map(response => response.json())
  }

  public getMatchInvitations(id) {
    let url = "http://localhost:8080/match/invites/" + id;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url)
      .map(response => response.json());
  }


  public getRefMatchInvitations(id) {
    let url = "http://localhost:8080/match/invites/ref/" + id;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url)
      .map(response => response.json());
  }

  public acceptRefMatch(id){
  	 let url = "http://localhost:8080/match/ref/accept/"+id;
   let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url)
      .map(response => response.json());
  }

 public getMatches(id){
  	 let url = "http://localhost:8080/matches/search/"+id;
   let headers = new Headers();
   console.log(url);
    headers.append('Content-Type', 'application/json');
    return this.http.get(url)
      .map(response => response.json());
  }

   public getMatchesAsRef(id){
  	 let url = "http://localhost:8080/matches/ref/search/"+id;
   let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url)
      .map(response => response.json());
  }

    public acceptTeamMatch(id){
  	 let url = "http://localhost:8080/match/team/accept/"+id;
   let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url)
      .map(response => response.json());
  }
  public denyMatch(id){
  	 let url = "http://localhost:8080/match/deny/"+id;
   let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url)
      .map(response => response.json());
  }

 
  }

