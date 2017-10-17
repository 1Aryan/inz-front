import { Component,ViewChild} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import {UserLogin} from '../../_models/UserLogin';
import {AuthService} from '../../_services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {User} from '../../_models/User';
import {StorageService} from '../../_services/storage.service'

@Component({ 
  selector: 'authentication',
  templateUrl: './authentication.html',
  styleUrls: ['./authentication.css']
})


export class Authentication {

@ViewChild('authModal') public authModal:ModalDirective;

private user : UserLogin;
private userLogged:any;
constructor(
	private authService : AuthService,
	private _flashMessagesService: FlashMessagesService,
	private _storageService: StorageService,
	){
this.user = new UserLogin();
}

show(){
  this.authModal.show();
}
hide(){
  this.authModal.hide();
}

submit(){
	console.log(this.user);
this.authService.login(this.user)
	.subscribe(
		(success) => {
			this._flashMessagesService.show("Zalogowano!",{ cssClass: 'alert-success', timeout: 1500 });
			this.authService.getUser(success.id).subscribe((successLoggedUser) =>{

			
			this.hide();
			this.userLogged= new User();
			this.userLogged = successLoggedUser;

			localStorage.setItem('token', success.token);
			this._storageService.sendLoginSubject(this.userLogged);

			;
		},
		(error) => {
			this._flashMessagesService.show("Błędne dane!",{ cssClass: 'alert-danger', timeout: 2000 });
		});
		
		},
		
		(errorLoggedUser) => {
			this._flashMessagesService.show("Błędne dane!",{ cssClass: 'alert-danger', timeout: 2000 });
			
			})
		}}



