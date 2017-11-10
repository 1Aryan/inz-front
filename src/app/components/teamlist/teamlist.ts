import { Component,ViewChild, OnInit} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';
import {StorageService} from '../../_services/storage.service';
import {SearchService} from '../../_services/search.service';
import {Team} from '../../_models/Team';
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

constructor(private _searchService: SearchService,private storageService: StorageService){
this.searchTeam = new Team();
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
			console.log("teamlist account subscribed");
		}}
		)
}

searchForTeams(){
	console.log(this.searchTeam);
this._searchService.searchForTeams(this.searchTeam)
	.subscribe(
		(success)=>{

			this.totalTeams = this._searchService.totalUsers;
			this.results = success;
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
			console.log("szczegoly druzyny success");
		},
		(error)=>{
			console.log("szczegoly druzyny FAIL");
		}
		)
}

}



