import { Component,ViewChild, OnInit} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../../_models/User';
import { UserService} from '../../_services/user.service';
import { mailValidator } from '../../validators/mail-validator';
import { phoneValidator } from '../../validators/phone-validator';
import { passwordValidator } from '../../validators/password-validator';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

@Component({
  selector: 'coach-list',
  templateUrl: './coach-list.html',
  styleUrls: ['./coach-list.css']
})


export class CoachList {

@ViewChild('userModal') public userModal:ModalDirective;
	


}



