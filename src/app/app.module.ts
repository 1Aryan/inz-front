import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { Uppernavbar } from './components/uppernavbar/uppernavbar';
import { Welcome } from './components/welcome/welcome';
import { AppComponent } from './app.component';

import {UserRegister} from './components/register/user-register';
import {AppRouterModule} from './components/router/router.module'
import {Authentication} from './components/authentication/authentication';
import {FlashMessagesModule} from 'angular2-flash-messages/module';
import {UserService} from './_services/user.service';
import {AuthService} from './_services/auth.service';
import { HttpModule } from '@angular/http';
import {StorageService} from './_services/storage.service';


@NgModule({
  declarations: [
     AppComponent,
  	Welcome,
    Uppernavbar,
    UserRegister,
    Authentication,
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule,
    HttpModule,
    AppRouterModule,
    ModalModule.forRoot()
  ],
  providers: [UserService,AuthService,StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
