import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HrAdminComponent} from "./employee/hr-admin/hr-admin.component";
import {AddEmployeeComponent} from "./employee/hr-admin/add-employee/add-employee.component";
import {EditEmployeeComponent} from "./employee/hr-admin/edit-employee/edit-employee.component";
import {ManagerComponent} from "./employee/manager/manager.component";
import {CreateLeaveComponent} from "./shared/create-leave/create-leave.component";
import {ViewLeavesComponent} from "./shared/view-leaves/view-leaves.component";
import {MemberComponent} from "./employee/member/member.component";
import {ApproveRejectLeaveComponent} from "./employee/hr-admin/approve-reject-leave/approve-reject-leave.component";
import {LandingPageComponent} from "./landing/landing-page/landing-page.component";

const routes: Routes = [
    {path: 'landing', component: LandingPageComponent},
    {
        path: 'hr-admin',
        children: [
            {path: '', component: HrAdminComponent},
            {path: 'add-employee', component: AddEmployeeComponent},
            {path: 'edit-employee', component: EditEmployeeComponent},
            {path: 'leaves', component: ApproveRejectLeaveComponent},
        ]
    },
    {
        path: 'manager',
        children: [
            {path: '', component: ManagerComponent},
            {path: 'apply', component: CreateLeaveComponent},
            {path: 'my-leaves', component: ViewLeavesComponent}
        ]
    },
    {
        path: 'member',
        children: [
            {path: '', component: MemberComponent},
            {path: 'apply', component: CreateLeaveComponent},
            {path: 'my-leaves', component: MemberComponent}
        ]
    },
    {path: '**', redirectTo: 'landing'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
