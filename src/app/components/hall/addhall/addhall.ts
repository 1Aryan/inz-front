import { Component,ViewChild, OnInit} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Hall } from '../../../_models/Hall';
import { HallService} from '../../../_services/hall.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Router} from '@angular/router';

@Component({
  selector: 'add-hall',
  templateUrl: './addhall.html',
  styleUrls: ['./addhall.css']
})


export class AddHall implements OnInit{

@ViewChild('hallModal') public hallModal:ModalDirective;

private form: FormGroup;
private hall:Hall;

constructor(
private fb: FormBuilder,
private hallService: HallService,
private _flashMessagesService: FlashMessagesService,
private router:Router,
	){
	this.hall = new Hall();

	}

show(){
  this.hallModal.show();
}
hide(){
  this.hallModal.hide();
}
ngOnInit(){
this.setFormValidators();
}
addHall(){
	console.log("hala:" +this.hall.getAdress());
	if(this.form.valid){
		
		this.hallService.addHall(this.hall)
		.subscribe(
			success=>{
				this.hide();
				this._flashMessagesService.show("Hala dodana, oczekuje na zatwierdzenie przez administratora",{ cssClass: 'alert-success', timeout: 2000 });
				this.setFormValidators();
			},
			error=>{
				this._flashMessagesService.show("Ta hala została dodana wczesniej!",{ cssClass: 'alert-danger', timeout: 2000 });
			}
			)
	}
}

private validValueSet(){

this.hall.setAdress(this.form.value.adress);
this.hall.setDescription(this.form.value.description);
this.hall.setPrice(this.form.value.price);
this.hall.setCity(this.form.value.city);
this.hall.setNumber(this.form.value.number);
console.log(this.hall);
}

private setFormValidators(){
this.form = this.fb.group({
city: ['', [Validators.required, Validators.pattern('[a-zA-z]+')]],
number: ['', [Validators.required, Validators.pattern('[1-9][0-9]{0,2}[a-zA-z]{0,1}')]],
adress: ['', [Validators.required, Validators.pattern('[a-zA-z]+')]],
description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
price: ['', [Validators.required, Validators.pattern('[1-9][0-9]{0,2}')]],


})

this.form.valueChanges.subscribe(data => this.validValueSet())

}





}



