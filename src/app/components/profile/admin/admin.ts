import { Component,ViewChild,OnInit,ViewContainerRef} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {ModalDirective,ModalModule} from 'ngx-bootstrap/modal';
import {StorageService} from '../../../_services/storage.service';
import { Subscription } from 'rxjs/Subscription';
import {User} from '../../../_models/User'
import {UserService} from '../../../_services/user.service'
import { phoneValidator } from '../../../validators/phone-validator';
import { mailValidator } from '../../../validators/mail-validator';
import {AdminService} from '../../../_services/admin.service';
import {MsgFromAdmin} from '../../../_models/MsgFromAdmin';

@Component({
  selector: 'admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin implements OnInit {

private adminMsg:any;
private answer:MsgFromAdmin;
private MsgFromAdmin:any;
results: any[];

constructor(private adminService : AdminService) {
this.answer = new MsgFromAdmin();

}

ngOnInit(){
	this.getMsgs();

}

setAnswerCredentials(email,msgTo){
this.answer.setEmail(email); 
this.answer.setMsgTo(msgTo);
}

getMsgs(){
	this.adminService.getMsgs()
	.subscribe(
		success=>{
			this.results=success;
			console.log("doszły wiadomości od userów dla admina");
		}
		)
}

answerUser(){

this.answer.setMsgFrom(this.MsgFromAdmin);
this.adminService.answerMsg(this.answer)
	.subscribe(
			success=>{
				console.log("wyslano odpowiedz na wiadomosc od usera");
			},
			error=>{
					console.log("NIEwyslano odpowiedz na wiadomosc od usera");
			}
		)

}

deleteMessage(){


this.adminService.deleteMsg(this.answer)
	.subscribe(
			success=>{
				console.log("SKASOWANO WIADOMOSC");
			},
			error=>{
					console.log("Nieskasowano wiadomosci");
			}
		)

}

}