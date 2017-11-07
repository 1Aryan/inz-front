import { Component,ViewChild,OnInit,ViewContainerRef} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {ModalDirective,ModalModule} from 'ngx-bootstrap/modal';
import {StorageService} from '../../../_services/storage.service';
import { Subscription } from 'rxjs/Subscription';
import {User} from '../../../_models/User'
import {UserService} from '../../../_services/user.service'
import { phoneValidator } from '../../../validators/phone-validator';
import { mailValidator } from '../../../validators/mail-validator';

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


constructor(private storageService: StorageService,private fb: FormBuilder,private userService: UserService) 
{
this.user = new User();
}


ngOnInit(){
	this.subscribeUser();
	this.setFormValidators();
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

private validValueSet(){
this.user.setLastName(this.form.value.lastname);
this.user.setName(this.form.value.name);
this.user.setPhone(this.form.value.phone);
this.user.setYear(this.form.value.year);
}

editProfile(){

	console.log(this.user);
this.userService.editProfile(this.user)
.subscribe(
	success=>{

		console.log("udalo sie edytowac playera//tu wstaw modal");
	},
	error=>{
		console.log("blad");
		
	}
	)}

retrievePassword(){
this.userService.getPassword(this.retrieveId)
.subscribe(
	success=>{

		console.log("udalo sie przypomniec haslo playera//tu wstaw modal");
	},
	error=>{
		console.log("juz przypominales haslo w przeciagu ostatniej godziny !");
		
	}
	)
}
editSalary(){

	
this.userService.editSalary(this.retrieveId,this.salary)
.subscribe(
	success=>{

		console.log("udalo sie dodać hajsy//tu wstaw modal");
	},
	error=>{
		console.log("blad");
		
	}
	)}
private setFormValidators(){
this.form = this.fb.group({
name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
phone: ['', [Validators.required, phoneValidator]],
year: ['', [Validators.required, Validators.pattern('(19|20)[0-9][0-9]')]],
}),
this.form.valueChanges.subscribe(data => this.validValueSet())
}

}
