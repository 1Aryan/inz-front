import { Component,ViewChild, OnInit} from '@angular/core';
import {SearchService} from '../../_services/search.service';
import { SearchDates } from '../../_models/SearchDates'

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
private dates:SearchDates;
private dt1=null;
private dt2=null;
constructor(private searchService:SearchService){
this.dates = new SearchDates();
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
searchForMatches(){
	this.dates.dateFrom = this.dt1;
	this.dates.dateTo = this.dt2;
	this.searchService.getMatchesWithinDates(this.dates).subscribe(
			success=>{
		console.log("found matches");
		console.log(success);
		this.foundMatches=success;
		this.totalMatches=this.searchService.totalUsers;
	},
	error=>{
		console.log("matches not found");
	}
	)
}
}



