import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {StorageService} from './../storage.service';
@Injectable()
export class AuthGuardService implements CanActivate {
loggedIn:boolean;
  
  constructor(
    private router: Router,private storageService:StorageService){
    
    StorageService.LoginStream$.subscribe(
    (account) => {
      if(account != null){
      this.loggedIn=true;
    }})}
  

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loggedIn) {
      return true;
    } else {
      this.router.navigate(['/']);
       return false;
      }
    }
    
  }


