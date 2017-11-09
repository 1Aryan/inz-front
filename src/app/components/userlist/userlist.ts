import { Component,ViewChild, OnInit} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {SearchUser} from '../../_models/SearchUser';
import {SearchUserService} from '../../_services/searchUser.service'
import 'rxjs/add/operator/map';
import {StorageService} from '../../_services/storage.service';
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
 subscribedAccount:any;
 private searchUser: SearchUser;

  roles = [
       {id: 0,name: "Zawodnik"},
       {id: 1,name: "Trener"},
       {id: 2,name: "Sędzia"},
       {id: 3,name: "Wszystkie"},
     ];

constructor(private _searchUserService: SearchUserService,private storageService: StorageService){
	this.searchUser = new SearchUser();
}
 

ngOnInit(){
	this.searchForUsers();
	this.subscribeUser();
}

saveRole(){
 this.id = +this.id;
 this.searchUser.role = this.roles[this.id].name;
}

searchForUsers(){
this._searchUserService.searchForUsers(this.searchUser)
	.subscribe(
		(success)=>{
			this.totalUsers = this._searchUserService.totalUsers;
			this.results = success;
			console.log("users searched success");
		},
		(error)=>{
			console.log("failed searching userow");
		}
		)

}

subscribeUser(){
	StorageService.LoginStream$.subscribe(
		(account) => {
			if(account != null){
			this.subscribedAccount=account;
			console.log("userlist account subscribed");
		}
		
		}
		)
}

}



