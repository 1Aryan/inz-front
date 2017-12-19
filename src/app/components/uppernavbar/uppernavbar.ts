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

private profileButton: boolean=false;
private userEmail: string;

@ViewChild('registerModal') public registerModal:UserRegister;
@ViewChild('flashModal') public flashModal:ModalDirective;

private flashText: string;

constructor(private viewContainerRef: ViewContainerRef,private storageService: StorageService,private router: Router){}

ngOnInit(){
this.subscribeUser();
}

logOut(){
	this.storageService.announceLogout();
	this.profileButton = false;
	this.router.navigate(['/']);
	this.flashText = "Wylogowano";
				this.flashModal.show();
}

subscribeUser(){
	StorageService.LoginStream$.subscribe(
		(account) => {
			if(account != null){
			this.userEmail=account.email;
			this.profileButton = true;

		}}
		)
}}