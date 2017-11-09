import { Component,OnInit,ViewChild} from '@angular/core';
import {StorageService} from '../../_services/storage.service';
import { Subscription } from 'rxjs/Subscription';
import { ModalDirective } from 'ngx-bootstrap';
import {AddHall} from '../hall/addhall/addhall';
import {AdminService} from '../../_services/admin.service';
import {MsgToAdmin} from '../../_models/MsgToAdmin';

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
private textMsg: string;
private userId: number;
private msg: MsgToAdmin;

constructor(private storageService: StorageService,private adminService : AdminService) 
	{
	this.profileButton =false;
	this.msg = new MsgToAdmin();
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
			this.userId=account.id;
		}})
}

contactAdmin(){
this.msg.setId(this.userId);
this.msg.setMsg(this.textMsg);
this.adminService.contactAdmin(this.msg)
.subscribe(
	success=>{
		console.log("succesfuly contacted admin")
	},
	error=>{
		console.log("unsuccessfuly contated admin")	
	}
	)
}



}