import { Component,ViewChild, OnInit} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {Hall} from '../../../_models/Hall';
import {HallService} from '../../../_services/hall.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'hall-list',
  templateUrl: './halllist.html',
  styleUrls: ['./halllist.css']
})


export class HallList implements OnInit{
 
results: any[]
totalHalls: any;
private hall:Hall;

constructor(private hallService: HallService){
	this.hall = new Hall();
}

ngOnInit(){
	this.searchForHalls();
}

searchForHalls(){
this.hallService.searchForHalls(this.hall)
	.subscribe(
		(success)=>{
			this.totalHalls = this.hallService.totalHalls;
			this.results = success;
			console.log("wyszukano HALE");
		},
		(error)=>{
			console.log("nie wyszukano HAL");
		}
		)
}

}



