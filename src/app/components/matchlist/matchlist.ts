import { Component,ViewChild, OnInit} from '@angular/core';
import {SearchService} from '../../_services/search.service';

@Component({
  selector: 'match-list',
  templateUrl: './matchlist.html',
  styleUrls: ['./matchlist.css']
})


export class MatchList implements OnInit{
private foundMatches:any[]
private teamResults:any[]
private detailedTeamName:any;
private totalMatches:number;
constructor(private searchService:SearchService){

}

ngOnInit(){
this.getMatches();
}

getMatches(){
this.searchService.getMatches().subscribe(
	success=>{
		console.log("found matches");
		this.foundMatches=success;
		this.totalMatches=this.searchService.totalUsers;
	},
	error=>{
		console.log("matches not found");
	}
	)
}

getTeamDetails(id){
	this.searchService.getTeamDetails(id)
	.subscribe(
		(success)=>{
			console.log(success);
			this.teamResults=success;
			console.log("szczegoly druzyny success");
		},
		(error)=>{
			console.log("szczegoly druzyny FAIL");
		}
		)
}

}



