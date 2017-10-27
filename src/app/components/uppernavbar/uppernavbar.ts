import { Component,ViewChild,OnInit,ViewContainerRef} from '@angular/core';
import {ModalDirective,ModalModule} from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs/Subscription';
import {Router} from '@angular/router';

import {AuthService} from '../../_services/auth.service';
import {UserRegister} from '../register/user-register';
import {Authentication} from '../authentication/authentication';
import {StorageService} from '../../_services/storage.service'



@Component({
  selector: 'upper-navbar',
  templateUrl: './uppernavbar.html',
  styleUrls: ['./uppernavbar.css']
})
export class Uppernavbar implements OnInit {
private profileButton: boolean;
private userEmail: string;
loggedUser: any;

subscription: Subscription;
@ViewChild('registerModal') public registerModal:UserRegister;

constructor(
	private viewContainerRef: ViewContainerRef,
	private storageService: StorageService,
	private router: Router,) 
	{
	this.profileButton =false;
  	}
ngOnInit(){
this.subscribeUser();
}
logOut(){
	this.storageService.clearLoginSubject();
	this.profileButton = false;
}
subscribeUser(){
	this.subscription = this.storageService.getLoginSubject().subscribe(
		(account) => {
			if(account != null){
			this.userEmail = account.email;
			this.loggedUser = account;
			this.profileButton = true;
		}
		
		}
		)
}
}