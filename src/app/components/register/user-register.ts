import { Component,ViewChild, OnInit} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../../_models/User';
import { UserService} from '../../_services/user.service';
import { mailValidator } from '../../validators/mail-validator';
import { phoneValidator } from '../../validators/phone-validator';
import { passwordValidator } from '../../validators/password-validator';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

@Component({
  selector: 'user-register',
  templateUrl: './user-register.html',
  styleUrls: ['./user-register.css']
})


export class UserRegister implements OnInit{
@ViewChild('userModal') public userModal:ModalDirective;

id:number=null;

  roles = [
       {id: 0,name: "Zawodnik"},
       {id: 1,name: "Trener"},
       {id: 2,name: "Sędzia"},
       {id: 3,name: "Sanitariusz"},
     ];

saveRole(){
 this.id = +this.id;
 this.user.setRole(this.roles[this.id].name);
}

private form: FormGroup;
private user: User;
constructor(
private fb: FormBuilder,
private playerService: UserService,
private _flashMessagesService: FlashMessagesService,
	){
	this.user= new User();

	}
ngOnInit(){
this.setFormValidators();
}

show(){
  this.userModal.show();
}
hide(){
  this.userModal.hide();
}
submit(){

	if(this.form.valid){
		console.log(this.user);
		this.playerService.createPlayer(this.user)
		.subscribe(
			success=>{
				this.hide();
				this.setFormValidators();
				this._flashMessagesService.show("Konto założone!",{ cssClass: 'alert-success', timeout: 2000 });
			},
			error=>{
				this._flashMessagesService.show("E-mail zajęty!",{ cssClass: 'alert-danger', timeout: 2000 });
			}
			)
	}
}

private validValueSet(){

this.user.setEmail(this.form.value.email);
this.user.setLastName(this.form.value.lastname);
this.user.setName(this.form.value.name);
this.user.setPhone(this.form.value.phone);
this.user.setPassword(this.form.value.password);
this.user.setYear(this.form.value.year);
}

private setFormValidators(){
this.form = this.fb.group({

name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
email: ['', [Validators.required, mailValidator]],
phone: ['', [Validators.required, phoneValidator]],
year: ['', [Validators.required, Validators.pattern('(19|20)[0-9][0-9]')]],
password: ['', [Validators.required, Validators.minLength(8)]],
password2: ['', [Validators.required, Validators.minLength(8)]],

},{validator: passwordValidator}),

this.form.valueChanges.subscribe(data => this.validValueSet())

}





}



