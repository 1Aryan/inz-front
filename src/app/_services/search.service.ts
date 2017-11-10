import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { SearchUser } from '../_models/SearchUser';
import { URLSearchParams } from '@angular/http';
import { Team } from '../_models/Team';
@Injectable()
export class SearchService {
  
  totalUsers:any;
  
  constructor(private http: Http){}

  public searchForUsers(searchUser: SearchUser){
    
    let url = "http://localhost:8080/search/users";
    let body = JSON.stringify(searchUser);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, body, {headers: headers})
      .map((res) => { 
       this.totalUsers = res.headers.get('total');
       return res.json();
       })
  
  }

  public searchForTeams(team : Team){
    
    let url = "http://localhost:8080/search/teams";
    let body = JSON.stringify(team);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, body, {headers: headers})
      .map((res) => { 
       this.totalUsers = res.headers.get('total');
       return res.json();
       })
  
  }

   public getTeamDetails(id){
   console.log(id);
    let url = "http://localhost:8080/search/teams/"+id;
    return this.http.get(url)
      .map((res) => { 
       return res.json();
       })
  
  }

}

