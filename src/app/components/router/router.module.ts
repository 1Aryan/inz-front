import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {Welcome} from '../welcome/welcome';
import {UserList} from '../userlist/userlist'
import {HallList} from'../hall/halllist/halllist';
import {PlayerProfile} from '../profile/player-profile/player-profile';
import {AuthGuardService} from '../../_services/auth-guards/auth-guard.service';
import {PlayerGuardService} from '../../_services/auth-guards/player-guard.service';
import {CoachProfile} from '../profile/coach-profile/coach-profile';
import {CoachGuardService} from '../../_services/auth-guards/coach-guard.service';
import {RefreeGuardService} from '../../_services/auth-guards/refree-guard.service';
import {RefreeProfile} from '../profile/refree-profile/refree-profile';
import {Admin} from '../profile/admin/admin';
import {AdminGuardService} from '../../_services/auth-guards/admin-guard.service';
import {TeamList} from '../teamlist/teamlist'
import {MatchList} from '../matchlist/matchlist'
const routes : Routes = [
{path:'', component: Welcome},
{path: 'uzytkownicy', component: UserList, canActivate: [AuthGuardService]},
{path: 'hale', component: HallList,canActivate: [AuthGuardService]},
{path: 'profil', component: PlayerProfile,canActivate: [PlayerGuardService]},
{path: 'trener', component: CoachProfile,canActivate: [CoachGuardService]},
{path: 'sedzia', component: RefreeProfile,canActivate: [RefreeGuardService]},
{path: 'admin', component: Admin,canActivate: [AdminGuardService]},
{path: 'druzyny', component: TeamList, canActivate: [AuthGuardService]},
{path: 'mecze', component: MatchList},
]
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [AdminGuardService,RefreeGuardService,AuthGuardService,PlayerGuardService,CoachGuardService]
})


export class AppRouterModule{}