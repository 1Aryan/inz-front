import { Component,ViewChild,ViewContainerRef,TemplateRef} from '@angular/core';
import {ModalDirective,ModalModule} from 'ngx-bootstrap/modal';


import {UserRegister} from '../register/user-register';
import {Authentication} from '../authentication/authentication';




@Component({
  selector: 'upper-navbar',
  templateUrl: './uppernavbar.html',
  styleUrls: ['./uppernavbar.css']
})
export class Uppernavbar {

constructor(private viewContainerRef: ViewContainerRef) {
  }

  @ViewChild('registerModal') public registerModal:UserRegister;

 
}
