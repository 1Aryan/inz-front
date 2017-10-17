import { Component,ViewChild} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import {UserLogin} from '../../_models/UserLogin';
import {AuthService} from '../../_services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {User} from '../../_models/User';
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
			this.hide();
			this.userLogged= new User();
			localStorage.setItem('id', success.id);
			localStorage.setItem('name', success.name);
			localStorage.setItem('lastname', success.lastname);
			localStorage.setItem('email', success.email);
			localStorage.setItem('role', success.usertype);
			localStorage.setItem('token', success.token);

			console.log(localStorage.getItem('id'));
			console.log(localStorage.getItem('name'));
			console.log(localStorage.getItem('lastname'));
			console.log(localStorage.getItem('email'));
			console.log(localStorage.getItem('role'));
			console.log(localStorage.getItem('token'));
	

			this._flashMessagesService.show("Zalogowano!",{ cssClass: 'alert-success', timeout: 1500 });
		},
		(error) => {
			this._flashMessagesService.show("Błędne dane!",{ cssClass: 'alert-danger', timeout: 2000 });
		}
		)

}


}



