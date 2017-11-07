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

private user : UserLogin;
private userLogged:any;

constructor(
	private authService : AuthService,
	private _flashMessagesService: FlashMessagesService,
	private _storageService: StorageService,
	private router:Router,
	){
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
			
			this._flashMessagesService.show("Zalogowano!",{ cssClass: 'alert-success', timeout: 1500 });
			this.authService.getUser(success.id).subscribe((successLoggedUser) =>{
			this.hide();
			this.userLogged= new User();
			this.userLogged = successLoggedUser;
			console.log(this.userLogged);
			localStorage.setItem('token', success.token);
			this._storageService.announceLogin(this.userLogged);
		},
		(error) => {
			this._flashMessagesService.show("Błędne dane lub nieaktywne konto, sprawdź email!",{ cssClass: 'alert-danger', timeout: 2000 });
		});
		},
		(errorLoggedUser) => {
			this._flashMessagesService.show("Błędne dane lub nieaktywne konto, sprawdź email!",{ cssClass: 'alert-danger', timeout: 2000 });
			
			})
		}

activate(email: string){
this.authService.activate(email)
.subscribe(
		(success)=>{
			this.router.navigate(['']);
			this._flashMessagesService.show("Link aktywacyjny został wysłany na podany adres e-mail",{ cssClass: 'alert-success', timeout: 1500 });
			this.hideActivateModal();
		},
		(error)=>{

				this._flashMessagesService.show("Email nie istnieje",{ cssClass: 'alert-danger', timeout: 2000 });
		}
	)

}
}