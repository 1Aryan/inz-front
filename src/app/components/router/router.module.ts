import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {Welcome} from '../welcome/welcome';






const routes : Routes = [
{path:'', component: Welcome},

]
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRouterModule{}