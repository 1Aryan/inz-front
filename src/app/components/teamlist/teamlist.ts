import { Component,ViewChild, OnInit} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';
import {StorageService} from '../../_services/storage.service';
import {SearchService} from '../../_services/search.service';
import {Team} from '../../_models/Team';
import {HallService} from '../../_services/hall.service';
import {Hall} from '../../_models/Hall';
import {SearchUser} from '../../_models/SearchUser';

@Component({
  selector: 'team-list',
  templateUrl: './teamlist.html',
  styleUrls: ['./teamlist.css']
})

export class TeamList implements OnInit{

private searchTeam: Team;
private subscribedAccount;
private totalTeams;
private results:any[];
private teamresults:any[];
private oppositeTeamId:number;
private numberOfPlayers:number;
private searchDummyHall: Hall;
private searchDummyRefree: SearchUser;
private totalHalls:number;
private foundHalls:any[];
private foundRefs:any[];
private oppositeTeam;

constructor(private _searchService: SearchService,private hallService: HallService, private storageService: StorageService){
this.searchTeam = new Team();
this.searchDummyHall = new Hall();
this.searchDummyRefree = new SearchUser();

}

ngOnInit(){
	this.searchForTeams();
	this.subscribeUser();
	
}

subscribeUser(){
	StorageService.LoginStream$.subscribe(
		(account) => {
			if(account != null){
			this.subscribedAccount=account;
			console.log(this.subscribedAccount.team.id);
			console.log("teamlist account subscribed");
		}}
		)
}

searchForTeams(){
this._searchService.searchForTeams(this.searchTeam)
	.subscribe(
		(success)=>{
			this.totalTeams = this._searchService.totalUsers;
			this.results = success;
			console.log(this.results);
			console.log("teams searched success");
		},
		(error)=>{
			console.log("failed searching teams");
		}
		)
}

getTeamDetails(id){
	this._searchService.getTeamDetails(id)
	.subscribe(
		(success)=>{

			this.teamresults=success;
			this.oppositeTeamId=this.teamresults[0].teamDAO.id;
			this.oppositeTeam=this.teamresults[0].teamDAO;
			
			console.log("szczegoly druzyny success");
		},
		(error)=>{
			console.log("szczegoly druzyny FAIL");
		}
		)
}

searchForHalls(){
this.hallService.searchForHalls(this.searchDummyHall)
	.subscribe(
		(success)=>{
			this.totalHalls = this.hallService.totalHalls;
			this.foundHalls = success;
		
			console.log("wyszukano HALE");
		},
		(error)=>{
			console.log("nie wyszukano HAL");
		}
		)
}

searchForRefs(){
	this.searchDummyRefree.setRole("Sędzia");
this._searchService.searchForUsers(this.searchDummyRefree)
	.subscribe(
		(success)=>{
			this.foundRefs = success
			console.log(this.foundRefs);
			console.log("users searched success");
		},
		(error)=>{
			console.log("failed searching userow");
		}
		)

}

}



