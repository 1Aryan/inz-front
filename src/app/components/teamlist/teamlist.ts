import { Component,ViewChild, OnInit} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {StorageService} from '../../_services/storage.service';
import {SearchService} from '../../_services/search.service';
import {Team} from '../../_models/Team';
import {HallService} from '../../_services/hall.service';
import {Hall} from '../../_models/Hall';
import {SearchUser} from '../../_models/SearchUser';
import {MatchInvitation} from '../../_models/MatchInvitation';
import {MatchService} from '../../_services/match.service';
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
private matchInv: MatchInvitation;
private id:number;
private salary:number;
hours = [ 
    {id: 0, name: "08:00"}, 
    {id: 1, name: "11:00"},
    {id: 2, name: "14:00"},
    {id: 3, name: "17:00"},
    {id: 4, name: "20:00"}
    ];

constructor(private _searchService: SearchService,private matchService:MatchService, private hallService: HallService, private storageService: StorageService){
this.searchTeam = new Team();
this.searchDummyHall = new Hall();
this.searchDummyRefree = new SearchUser();
this.matchInv = new MatchInvitation();
}

saveRole(){
 this.id = +this.id;
 this.matchInv.setHour(this.hours[this.id].name);
}

ngOnInit(){
	this.searchForTeams();
	this.subscribeUser();

}

saveSalary(salary){
	this.matchInv.setSalary(salary);
}

subscribeUser(){
	StorageService.LoginStream$.subscribe(
		(account) => {
			if(account != null){
			this.subscribedAccount=account;
			console.log("teamlist account subscribed");
		}}
		)
}

inviteToMatch(){
	this.matchInv.setTeamB(this.oppositeTeam.id);
	this.matchInv.setTeamA(this.subscribedAccount.team.id);
	console.log(this.matchInv);
	this.matchService.inviteToMatch(this.matchInv).subscribe(
		success=>{
			console.log("Team invited to match");
		},
		error=>{
			console.log("failed to invite team to match ");
		}
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



