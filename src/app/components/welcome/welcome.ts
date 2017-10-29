import { Component,OnInit,ViewChild} from '@angular/core';
import {StorageService} from '../../_services/storage.service'
import { Subscription } from 'rxjs/Subscription';
import { ModalDirective } from 'ngx-bootstrap';
import {AddHall} from '../hall/addhall/addhall';
@Component({
  selector: 'welcome',
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.css']
})
export class Welcome implements OnInit  {

@ViewChild('hallModal') public hallModal:AddHall;
@ViewChild('contactModal') public contactModal:ModalDirective;
private profileButton: boolean;
private userEmail: string;
loggedUser: any;
subscription: Subscription;



constructor(
	private storageService: StorageService,
	) 
	{
	this.profileButton =false;
  	}


ngOnInit(){
	this.subscribeUser();
}

showHallModal(){this.hallModal.show();}
hideHallModal(){this.hallModal.hide();}
showContactModal(){this.contactModal.show();}
hideContactModal(){this.contactModal.hide();}

subscribeUser(){
	this.subscription = this.storageService.getLoginSubject().subscribe(
		(account) => {
			if(account != null){
			this.profileButton = true;
		}
		
		}
		)
}
}