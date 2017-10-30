import { Component,ViewChild,OnInit,ViewContainerRef} from '@angular/core';
import {ModalDirective,ModalModule} from 'ngx-bootstrap/modal';
import {StorageService} from '../../../_services/storage.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'player-profile',
  templateUrl: './player-profile.html',
  styleUrls: ['./player-profile.css']
})
export class PlayerProfile implements OnInit {
id:number=null;
loggedUserRole: any;
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
}

subscribeUser(){
	StorageService.LoginStream$.subscribe(
		(account) => {
			if(account != null){
			this.loggedUserRole=account.role;
			console.log(this.loggedUserRole);
		}
		
		}
		)
}
}

