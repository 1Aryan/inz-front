import { Component,ViewChild,OnInit,ViewContainerRef} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {ModalDirective,ModalModule} from 'ngx-bootstrap/modal';
import {StorageService} from '../../../_services/storage.service';
import { Subscription } from 'rxjs/Subscription';
import {User} from '../../../_models/User'
import {UserService} from '../../../_services/user.service'
import { phoneValidator } from '../../../validators/phone-validator';
import { mailValidator } from '../../../validators/mail-validator';
import {SearchService} from '../../../_services/search.service'
@Component({
  selector: 'player-profile',
  templateUrl: './player-profile.html',
  styleUrls: ['./player-profile.css']
})
export class PlayerProfile implements OnInit {

private teamresults:any[];
private user: User;
private form: FormGroup;
private retrieveId:any;
private invitationResults:any[];
private userTeam: boolean=false;
private subscribedTeam:any;


constructor(private storageService: StorageService,private fb: FormBuilder,private searchService:SearchService,private userService: UserService) 
{
this.user = new User();
}


ngOnInit(){
	this.subscribeUser();
	this.setFormValidators();
	this.getInvitations();
}

subscribeUser(){
	StorageService.LoginStream$.subscribe(
		(account) => {
			if(account != null){
				if(account.team!=null) this.userTeam=true;
				console.log(account);
			this.retrieveId=account.id;

			this.subscribedTeam=account.team;
			if(account.team!=null){
			this.getTeamDetails(this.subscribedTeam.id);
			}
		}})
}
getUserCredentials(){
	this.userService.getUser(this.retrieveId)
	.subscribe(
		success=>{
			this.storageService.announceLogin(success);
		}
		)
}
getInvitations(){
	this.userService.getInvitations(this.retrieveId)
		.subscribe(
				success=>{
						this.invitationResults=success;
						console.log(this.invitationResults);
						console.log("wyszukano zaproszenia do drużyn zawodnika");
				},
				error=>{
						console.log("NIEwyszukano zaproszen do drużyn");
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

private validValueSet(){
this.user.setLastName(this.form.value.lastname);
this.user.setName(this.form.value.name);
this.user.setPhone(this.form.value.phone);
this.user.setYear(this.form.value.year);
}

editProfile(){
this.userService.editProfile(this.user)
.subscribe(
	success=>{

		console.log("udalo sie edytowac playera");
	},
	error=>{
		console.log("blad edycji playera");
		
	}
	)}

acceptInvitation(id){
this.userService.acceptInvitation(this.retrieveId,id)
	.subscribe(
		success=>{
			this.getUserCredentials();

			console.log("Zaakceptowano zaproszenie");
		},
		error=>{
			console.log("Blad w akceptacji zaproszenie");
		}
		)
}

denyInvitation(id){
this.userService.denyInvitation(this.retrieveId,id)
	.subscribe(
		success=>{
			this.getInvitations();
			console.log("Odrzucono zaproszenie");
		},
		error=>{
			console.log("Zaakceptowano zaproszenie");
		}
		)
}
leaveTeam(){
	this.userService.removePlayerFromTeam(this.retrieveId).subscribe(
		success=>{
			this.getUserCredentials();
			this.subscribeUser();
			this.getInvitations();
			console.log("Odszedles z teamu");
		},
		error=>{
			console.log("Nie udało się odejsc z teamu");
		}		
		)
}
retrievePassword(){
this.userService.getPassword(this.retrieveId)
.subscribe(
	success=>{

		console.log("udalo sie przypomniec haslo playera");
	},
	error=>{
		console.log("juz przypominales haslo w przeciagu ostatniej godziny PLAYER!");
		
	}
	)
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

