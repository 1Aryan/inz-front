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
import {SearchService} from '../../../_services/search.service'
@Component({
  selector: 'refree-profile',
  templateUrl: './refree-profile.html',
  styleUrls: ['./refree-profile.css']
})
export class RefreeProfile  {
@ViewChild('flashModal') public flashModal:ModalDirective;
private flashText: string;

private user: User;
private form: FormGroup;
private retrieveId:any;
private salary: number;
private matchInvitations:any[];
private foundMatches:any[];
private teamresults:any[];

constructor(private storageService: StorageService, private searchService:SearchService,private fb: FormBuilder,private matchService:MatchService,private userService: UserService) {
this.user = new User();

}


ngOnInit(){
	this.subscribeUser();
	this.setFormValidators();
	this.getInvites();
	this.getMatches();

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
		this.flashText= "Mecz zaakceptowany!";
		this.flashModal.show();
		this.getInvites();
	},
	error=>{
		this.flashText= "Mecz już nie istnieje.";
		this.flashModal.show();
		this.getInvites();
	}
	)
}

getTeamDetails(id){
	this.searchService.getTeamDetails(id)
	.subscribe(
		(success)=>{

			this.teamresults=success;
			
			console.log("szczegoly druzyny success");
		},
		(error)=>{
			console.log("szczegoly druzyny FAIL");
		}
		)
}

getMatches(){
	this.matchService.getMatchesAsRef(this.retrieveId).subscribe(
		success=>{
			console.log("active matches found");
			this.foundMatches = success;
			console.log(this.foundMatches);
		},
		error=>{
			console.log("matches not found properly");
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
		this.flashText= "Udało się edytować profil!";
		this.flashModal.show();
	},
	error=>{
		this.flashText= "Błąd podczas edycji profilu.";
		this.flashModal.show();
	}
	)}

retrievePassword(){
this.userService.getPassword(this.retrieveId)
.subscribe(
	success=>{
		this.flashText= "Hasło zostało wysłane na twój adres e-mail!";
			this.flashModal.show();
	},
	error=>{
		this.flashText= "Błąd, spróbuj później.";
			this.flashModal.show();
		
	}
	)
}


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

