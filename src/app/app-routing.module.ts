import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HrAdminComponent} from "./hr-admin/hr-admin.component";
import {AddEmployeeComponent} from "./hr-admin/add-employee/add-employee.component";
import {EditEmployeeComponent} from "./hr-admin/edit-employee/edit-employee.component";
import {ManagerComponent} from "./manager/manager.component";
import {CreateLeaveComponent} from "./shared/create-leave/create-leave.component";
import {ViewLeavesComponent} from "./shared/view-leaves/view-leaves.component";
import {MemberComponent} from "./member/member.component";
import {ApproveRejectLeaveComponent} from "./hr-admin/approve-reject-leave/approve-reject-leave.component";

const routes: Routes = [
  {
    path: 'hr-admin',
    children:[
      {path: '', component: HrAdminComponent},
      {path: 'add-employee', component: AddEmployeeComponent},
      {path: 'edit-employee', component: EditEmployeeComponent},
      {path: 'leaves', component: ApproveRejectLeaveComponent},
    ]
  },
  {
    path: 'manager',
    children:[
      {path: '', component: ManagerComponent},
      {path: 'apply', component: CreateLeaveComponent},
      {path: 'my-leaves', component: ViewLeavesComponent}
    ]
  },
  {
    path: 'member',
    children:[
      {path: '', component: MemberComponent},
      {path: 'apply', component: CreateLeaveComponent},
      {path: 'my-leaves', component: MemberComponent}
    ]
  },
  {path: '**', redirectTo:'hr-admin'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
