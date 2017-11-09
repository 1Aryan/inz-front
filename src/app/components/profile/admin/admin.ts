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
import {MsgToAdmin} from '../../../_models/MsgToAdmin';

@Component({
  selector: 'admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin implements OnInit {

private msg: MsgToAdmin;
results: any[];

constructor(private adminService : AdminService,) {
}

ngOnInit(){
	this.getMsgs();
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
}

