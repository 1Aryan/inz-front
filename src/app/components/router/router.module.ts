import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {Welcome} from '../welcome/welcome';
import {UserList} from '../userlist/userlist'
import {HallList} from'../hall/halllist/halllist';
import {Profile} from '../profile/profile';



const routes : Routes = [
{path:'', component: Welcome},
{path: 'uzytkownicy', component: UserList},
{path: 'hale', component: HallList},
{path: 'profil', component: Profile},
]
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRouterModule{}