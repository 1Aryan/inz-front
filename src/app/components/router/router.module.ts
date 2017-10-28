import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {Welcome} from '../welcome/welcome';
import {UserList} from '../userlist/userlist'





const routes : Routes = [
{path:'', component: Welcome},
{path: 'uzytkownicy', component: UserList}
]
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRouterModule{}