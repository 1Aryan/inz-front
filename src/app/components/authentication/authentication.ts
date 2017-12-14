import { Component,ViewChild} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import {UserLogin} from '../../_models/UserLogin';
import {AuthService} from '../../_services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {User} from '../../_models/User';
import {StorageService} from '../../_services/storage.service'
import {Router} from '@angular/router';

@Component({ 
  selector: 'authentication',
  templateUrl: './authentication.html',
  styleUrls: ['./authentication.css']
})

export class Authentication {

@ViewChild('authModal') public authModal:ModalDirective;
@ViewChild('activateModal') public activateModal:ModalDirective;
@ViewChild('flashModal') public flashModal:ModalDirective;
private user : UserLogin;
private userLogged:any;
private flashText: string;

constructor(private authService : AuthService,private _flashMessagesService: FlashMessagesService,private _storageService: StorageService,private router:Router){
this.user = new UserLogin();
}

show(){this.authModal.show();}
hide(){this.authModal.hide();}

showActivateModal(){
	this.hide();
	this.activateModal.show();
}
hideActivateModal(){
	this.activateModal.hide();
}

submit(){
this.authService.login(this.user)
	.subscribe(
		(success) => {
	
			this.flashText= "Zalogowano!";
			this.authService.getUser(success.id).subscribe((successLoggedUser) =>{
			this.hide();
			this.userLogged= new User();
			this.userLogged = successLoggedUser;
			console.log("mam usera po zalogowaniu !!");
			localStorage.setItem('token', success.token);  //potrzebny token?
			this._storageService.announceLogin(this.userLogged);
			this.flashModal.show();
		},
		(error) => {
			this.flashText= "Błąd podczas logowania!";
			this.flashModal.show();
			
		})
		},
		(errorLoggedUser) => {
			this.flashText= "Błąd podczas logowania!";
			this.flashModal.show();
			})
		}

activate(email: string){
	this.authService.activate(email)
		.subscribe(
		(success)=>{
			this.router.navigate(['']);
			console.log("WYSŁANY LINK AKTYWACYJNY !!");
			this.hideActivateModal();
		},
		(error)=>{
			console.log("Email nie istnieje w bazie do aktywacji !!");
		}
	)}

}