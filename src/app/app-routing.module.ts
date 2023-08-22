import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HrAdminComponent} from "./hr-admin/hr-admin.component";
import {AddEmployeeComponent} from "./hr-admin/add-employee/add-employee.component";

const routes: Routes = [
  {
    path: 'hr-admin',
    children:[
      {path: '', component: HrAdminComponent},
      {path: 'add-employee', component: AddEmployeeComponent}
    ]
  },
  {path: '**', redirectTo:'hr-admin'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
