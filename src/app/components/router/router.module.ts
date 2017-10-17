import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {Welcome} from '../welcome/welcome';
import {CoachList} from '../coach-list/coach-list';





const routes : Routes = [
{path:'', component: Welcome},
{path:'trenerzy', component: CoachList}

]
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRouterModule{}