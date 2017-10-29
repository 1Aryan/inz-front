import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {Welcome} from '../welcome/welcome';
import {UserList} from '../userlist/userlist'
import {HallList} from'../hall/halllist/halllist';




const routes : Routes = [
{path:'', component: Welcome},
{path: 'uzytkownicy', component: UserList},
{path: 'hale', component: HallList}
]
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRouterModule{}