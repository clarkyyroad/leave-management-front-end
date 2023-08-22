import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HrAdminComponent} from "./hr-admin/hr-admin.component";

const routes: Routes = [
  {
    path: 'hr-admin',
    children:[
      {path: '', component: HrAdminComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
