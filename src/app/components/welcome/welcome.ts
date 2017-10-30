import { Component,OnInit,ViewChild} from '@angular/core';
import {StorageService} from '../../_services/storage.service';
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
@ViewChild('regulationsModal') public regulationsModal:ModalDirective;

private profileButton: boolean;
private userEmail: string;



constructor(
	private storageService: StorageService,
	) 
	{
	this.profileButton =false;
  	}


ngOnInit(){
	this.subscribeUser();
}

hideHallModal(){this.hallModal.hide();}
hideContactModal(){this.contactModal.hide();}
hideRegulationsModal(){this.regulationsModal.hide();}

subscribeUser(){
	StorageService.LoginStream$.subscribe(
		(account) => {
			if(account != null){
			this.profileButton = true;
		}
		
		}
		)
}
}