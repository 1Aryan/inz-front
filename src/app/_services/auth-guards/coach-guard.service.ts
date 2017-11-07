import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {StorageService} from './../storage.service';
@Injectable()
export class CoachGuardService implements CanActivate {
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
    if (this.role=='Trener') {
      return true;
    } else if(this.role=='Zawodnik') {
      this.router.navigate(['/zawodnik']);
       return false;
      }
      else if(this.role=='Sędzia'){
        this.router.navigate(['/sedzia']);
        return false;
      }
    }
    
  }


