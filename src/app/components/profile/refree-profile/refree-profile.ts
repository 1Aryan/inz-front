import { Component,ViewChild,OnInit,ViewContainerRef} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {ModalDirective,ModalModule} from 'ngx-bootstrap/modal';
import {StorageService} from '../../../_services/storage.service';
import { Subscription } from 'rxjs/Subscription';
import {User} from '../../../_models/User'
import {UserService} from '../../../_services/user.service'
import { phoneValidator } from '../../../validators/phone-validator';
import { mailValidator } from '../../../validators/mail-validator';
import {MatchService} from '../../../_services/match.service'
import {MatchInvitation} from '../../../_models/MatchInvitation'
@Component({
  selector: 'refree-profile',
  templateUrl: './refree-profile.html',
  styleUrls: ['./refree-profile.css']
})
export class RefreeProfile  {

private user: User;
private form: FormGroup;
private retrieveId:any;
private salary: number;
private matchInvitations:any[];

constructor(private storageService: StorageService,private fb: FormBuilder,private matchService:MatchService,private userService: UserService) {
this.user = new User();

}


ngOnInit(){
	this.subscribeUser();
	this.setFormValidators();
	this.getInvites();

}

subscribeUser(){
	StorageService.LoginStream$.subscribe(
		(account) => {
			if(account != null){
				console.log(account);
			this.retrieveId=account.id;
			this.user.setEmail(account.email);
		
		}})
}
acceptMatchInv(id){

this.matchService.acceptRefMatch(id).subscribe(
	success=>{
		console.log("success accept Match");
		this.getInvites();
	},
	error=>{
		console.log("fail accept match");
		this.getInvites();
	}
	)
}
denyMatchInv(id){
this.matchService.denyMatch(id).subscribe(
	success=>{
		console.log("success deny  Match");
		this.getInvites();
	},
	error=>{
		console.log("fail deny match");
		this.getInvites();
	}
	)
}

private validValueSet(){
this.user.setLastName(this.form.value.lastname);
this.user.setName(this.form.value.name);
this.user.setPhone(this.form.value.phone);
this.user.setYear(this.form.value.year);
}

getInvites(){
	this.matchService.getRefMatchInvitations(this.retrieveId).subscribe(
		success=>{
			
			this.matchInvitations=success;
			console.log(this.matchInvitations);
		},
		error=>{
			console.log("buont teamuf");
		}
		)
}

editProfile(){

this.userService.editProfile(this.user)
.subscribe(
	success=>{
		console.log("udalo sie edytowac refree");
	},
	error=>{
		console.log("blad edycji refree");
		
	}
	)}

retrievePassword(){
this.userService.getPassword(this.retrieveId)
.subscribe(
	success=>{
		console.log("udalo sie przypomniec haslo refree");
	},
	error=>{
		console.log("juz przypominales haslo w przeciagu ostatniej godziny REFREE !");
		
	}
	)
}

editSalary(){
this.userService.editSalary(this.retrieveId,this.salary)
.subscribe(
	success=>{
		console.log("udalo sie dodać opłate REFREE");
	},
	error=>{
		console.log("blad dodania opłaty REFREE");
		
	}
	)}

setFormValidators(){
this.form = this.fb.group({
name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
phone: ['', [Validators.required, phoneValidator]],
year: ['', [Validators.required, Validators.pattern('(19|20)[0-9][0-9]')]],
}),
this.form.valueChanges.subscribe(data => this.validValueSet())
}

}

