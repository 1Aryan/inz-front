import { Component,ViewChild,OnInit,ViewContainerRef} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {ModalDirective,ModalModule} from 'ngx-bootstrap/modal';
import {StorageService} from '../../../_services/storage.service';
import { Subscription } from 'rxjs/Subscription';
import {User} from '../../../_models/User'
import {UserService} from '../../../_services/user.service'
import { phoneValidator } from '../../../validators/phone-validator';
import { mailValidator } from '../../../validators/mail-validator';
import {Team} from '../../../_models/Team'
import {Router} from '@angular/router';

@Component({
  selector: 'coach-profile',
  templateUrl: './coach-profile.html',
  styleUrls: ['./coach-profile.css']
})
export class CoachProfile  {

private user: User;
private form: FormGroup;
private retrieveId:any;
private subscribedUser: any[];
private newTeam: Team;
private subscribedTeam:any;

constructor(private router:Router, private storageService: StorageService,private fb: FormBuilder,private userService: UserService) 
{
this.user = new User();
this.newTeam = new Team();
}

ngOnInit(){
	this.subscribeUser();
	this.setFormValidators();
}

subscribeUser(){
	StorageService.LoginStream$.subscribe(
		(account) => {
			if(account != null){
			
			this.retrieveId=account.id;
			this.user.setEmail(account.email);
			this.subscribedUser=account;
			this.subscribedTeam=account.teamDTO;
		
		}})
}



editProfile(){
this.userService.editProfile(this.user)
.subscribe(
	success=>{
	console.log("udalo sie edytowac kołcza");
	},
	error=>{
	console.log("blad edycji kołcza");
	}
	)}

createTeam(){
	this.userService.createTeam(this.retrieveId,this.newTeam)
	.subscribe(
		success=>{
			this.storageService.announceLogin(success);
			console.log("udalo sie stworzyc drużynę");
		},
		error=>{
			console.log("BLAD TWORZENIA DRUZYNY");
		}
		)
	
}

retrievePassword(){
this.userService.getPassword(this.retrieveId)
.subscribe(
	success=>{
		console.log("udalo sie przypomniec haslo kołcza");
	},
	error=>{
		console.log("juz przypominales haslo w przeciagu ostatniej godziny KOŁCZ !");
		
	}
	)
}

private validValueSet(){
this.user.setLastName(this.form.value.lastname);
this.user.setName(this.form.value.name);
this.user.setPhone(this.form.value.phone);
this.user.setYear(this.form.value.year);
}

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

