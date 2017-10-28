import { Component,ViewChild, OnInit} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {SearchUser} from '../../_models/SearchUser';
import {SearchUserService} from '../../_services/searchUser.service'
import 'rxjs/add/operator/map';

@Component({
  selector: 'user-list',
  templateUrl: './userlist.html',
  styleUrls: ['./userlist.css']
})


export class UserList implements OnInit{
 id:any;
 role:any;
 results: any[]
 totalUsers: any;
 private searchUser: SearchUser;

  roles = [
       {id: 0,name: "Zawodnik"},
       {id: 1,name: "Trener"},
       {id: 2,name: "Sędzia"},
       {id: 3,name: "Wszystkie"},
     ];

saveRole(){
 this.id = +this.id;
 this.searchUser.role = this.roles[this.id].name;
}
ngOnInit(){
	
}
constructor(private _searchUserService: SearchUserService,){
	this.searchUser = new SearchUser();
}

searchForUsers(){

this._searchUserService.searchForUsers(this.searchUser)
	.subscribe(
		(success)=>{
			this.totalUsers = this._searchUserService.totalUsers;
			this.results = success;
		},
		(error)=>{
			console.log("error");
		}
		)

}

}



