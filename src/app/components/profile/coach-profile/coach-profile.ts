import { Component,ViewChild,OnInit,ViewContainerRef,Directive, Output, EventEmitter, Input, SimpleChange} from '@angular/core';
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
import {SearchService} from '../../../_services/search.service'
import {MatchService} from '../../../_services/match.service'
@Component({
  selector: 'coach-profile',
  templateUrl: './coach-profile.html',
  styleUrls: ['./coach-profile.css']
})
export class CoachProfile  {

@ViewChild('flashModal') public flashModal:ModalDirective;
private flashText: string;

private user: User;
private form: FormGroup;
private retrieveId:any;
private subscribedUser: any[];
private newTeam: Team;
private subscribedTeam:any;
private teamresults:any[];
private editedTeam: Team;
private matchInvitations: any[];
private foundMatches:any[];

constructor(private router:Router,private searchService:SearchService, private matchService:MatchService,private storageService: StorageService,private fb: FormBuilder,private userService: UserService) 
{
this.editedTeam=new Team();
this.user = new User();
this.newTeam = new Team();
}

ngOnInit(){
	this.subscribeUser();
	this.setFormValidators();
	this.getInvites();
	this.getMatches();
}
getInvites(){
	this.matchService.getMatchInvitations(this.subscribedTeam.id).subscribe(
		success=>{
			this.matchInvitations=success;
		},
		error=>{
			console.log("failed to get invites");
		}
		)
}


subscribeUser(){
	StorageService.LoginStream$.subscribe(
		(account) => {
			if(account != null){
			console.log(account);
			this.retrieveId=account.id;
			this.user.setEmail(account.email);
			this.subscribedUser=account;
			this.subscribedTeam=account.team;
			if(account.team!=null){
			this.getTeamDetails(this.subscribedTeam.id);
			}
		
		}})
}

getUser(){
	this.userService.getUser(this.retrieveId).subscribe(
	success=>{
		this.storageService.announceLogout;
		this.storageService.announceLogin(success);
	})
}

acceptMatchInv(id){
this.matchService.acceptTeamMatch(id).subscribe(
	success=>{
		this.getInvites();
		this.flashText= "Mecz zaakceptowany!";
		this.flashModal.show();
	},
	error=>{
		this.flashText= "Mecz już nie istnieje.";
		this.flashModal.show();
		this.getInvites();
	}
	)
}

getMatches(){
	this.matchService.getMatches(this.subscribedTeam.id).subscribe(
		success=>{
			console.log(success);
			this.foundMatches = success;
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

removePlayer(id){
	this.userService.removePlayerFromTeam(id)
	.subscribe(
		success=>{
			this.subscribeUser();
			this.flashText= "Zawodnik usunięty z drużyny!";
			this.flashModal.show();
		},
		
		error=>{
		this.flashText= "Błąd podczas usuwania zawodnika.";
		this.flashModal.show();
	})}

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

editTeam(){
	this.searchService.editTeam(this.editedTeam, this.subscribedTeam.id)
	.subscribe(
		success=>{
		this.getUser();
		this.flashText= "Pomyślnie edytowałeś drużynę!";
			this.flashModal.show();
		
		},
		error=>{
			this.flashText= "Błąd podczas edycji, spróbuj później.";
			this.flashModal.show();
		}
		)
}

createTeam(){
	this.userService.createTeam(this.retrieveId,this.newTeam)
	.subscribe(
		success=>{
			this.storageService.announceLogout();
			this.storageService.announceLogin(success);
			this.flashText= "Drużyna stworzona!";
			this.flashModal.show();
		},
		error=>{
			this.flashText= "Błąd podczas tworzenia drużyny.";
			this.flashModal.show();
		}
		)
	
}

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

