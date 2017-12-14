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
import {HallService} from './_services/hall.service';
import {AuthService} from './_services/auth.service';
import {AdminService} from './_services/admin.service';
import { HttpModule } from '@angular/http';
import {StorageService} from './_services/storage.service';
import {UserList} from './components/userlist/userlist'
import {SearchService} from './_services/search.service';
import {AddHall} from './components/hall/addhall/addhall';
import {HallList} from './components/hall/halllist/halllist';
import {PlayerProfile} from './components/profile/player-profile/player-profile';
import {CoachProfile} from './components/profile/coach-profile/coach-profile';
import {RefreeProfile} from './components/profile/refree-profile/refree-profile';
import {Admin} from './components/profile/admin/admin';
import {TeamList} from './components/teamlist/teamlist';
import {MatchService} from './_services/match.service';
import {MatchList} from './components/matchlist/matchlist'


@NgModule({
  declarations: [
    AppComponent,
  	Welcome,
    Uppernavbar,
    UserRegister,
    Authentication,
    UserList,
    AddHall,
    HallList,
    PlayerProfile,
    CoachProfile,
    RefreeProfile,
    Admin,
    TeamList,
    MatchList
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
  providers: [MatchService,AdminService,StorageService,HallService,SearchService,UserService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
