import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {StorageService} from './../storage.service';
@Injectable()
export class AdminGuardService implements CanActivate {
role:string;
  
  constructor(
    private router: Router,private storageService:StorageService){
    
    StorageService.LoginStream$.subscribe(
    (account) => {
      if(account != null){
      this.role=account.role;
    }})
  }
  

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.role=='Admin') {
      console.log(this.role);
      return true;
    } else this.router.navigate(['/']);
      
      }
    }
    
  


