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
@ViewChild('flashModal') public flashModal:ModalDirective;

private flashText: string;
private adminMsg:any;
private answer:MsgFromAdmin;
private MsgFromAdmin:any;
results: any[];
hallResults:any[];
constructor(private adminService : AdminService) {
this.answer = new MsgFromAdmin();

}

ngOnInit(){
	this.getMsgs();
	this.getHalls();
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
			console.log("Wiadomości od userów doszły");
		}
		)
}

answerUser(){
this.answer.setMsgFrom(this.MsgFromAdmin);
this.adminService.answerMsg(this.answer)
	.subscribe(
			success=>{
				this.getMsgs();
				this.flashText= "Wysłano odpowiedź!";
				this.flashModal.show();
			},
			error=>{
				this.flashText= "Błąd podczas wysyłania odpowiedzi!";
				this.flashModal.show();
			}
		)

}

deleteMessage(){
this.adminService.deleteMsg(this.answer)
	.subscribe(
			success=>{
				this.getMsgs();
				console.log("SKASOWANO WIADOMOSC");
			},
			error=>{
					console.log("Nieskasowano wiadomosci");
			}
		)

}
activateHall(id){
this.adminService.activateHall(id)
.subscribe(
	success=>{
		this.getHalls();
		this.flashText= "Hala aktywna!";
		this.flashModal.show();
	},
	error=>{
		this.flashText= "Błąd podczas aktywacji hali.";
		this.flashModal.show();
	}
	)
}

deleteHall(id){
this.adminService.activateHall(id)
.subscribe(
	success=>{
		this.getHalls();
		console.log("skasowano halę")
	},
	error=>{
		console.log("kasacja hali FAIL")
	}
	)
}

getHalls(){
this.adminService.getInactiveHalls()
.subscribe(
	success=>{
		this.hallResults=success;
		console.log(success);
		console.log("Getting inactive halls SUCCESS")
	},
	error=>{
		console.log("Getting inactive halls FAILED")
	}	
	)
}
}