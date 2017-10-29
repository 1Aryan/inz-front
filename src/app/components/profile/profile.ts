import { Component,ViewChild,OnInit,ViewContainerRef} from '@angular/core';
import {ModalDirective,ModalModule} from 'ngx-bootstrap/modal';
import {StorageService} from '../../_services/storage.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
id:number=null;
verifyEmail:string;
subscription: Subscription;

  roles = [
       {id: 0,name: "1 - Rozgrywający"},
       {id: 1,name: "2 - Rzucający obronca"},
       {id: 2,name: "3 - Niski skrzydłowy"},
       {id: 3,name: "4 - Silny skrzydłowy"},
       {id: 4,name: "5 - Środkowy"},
     ];

constructor(private storageService: StorageService) 
{}
saveRole(){
 this.id = +this.id;
}

ngOnInit(){
	this.subscribeUser();
	console.log("ngoninit profile");
}

subscribeUser(){
	this.subscription = this.storageService.getLoginSubject().subscribe(
		(account) => {
			if(account != null){
			console.log(account.email);
			console.log(account);
			console.log("cos");
		}
		else{
			console.log("cos nie tak");
		}
		}
		)
}
}

