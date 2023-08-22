import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HrAdminComponent } from './hr-admin/hr-admin.component';
import { ManagerComponent } from './manager/manager.component';
import { MemberComponent } from './member/member.component';
import { AddEmployeeComponent } from './hr-admin/add-employee/add-employee.component';
import { EditEmployeeComponent } from './hr-admin/edit-employee/edit-employee.component';
import { CreateLeaveComponent } from './shared/create-leave/create-leave.component';
import { ViewLeavesComponent } from './shared/view-leaves/view-leaves.component';
import { ApproveRejectLeaveComponent } from './manager/approve-reject-leave/approve-reject-leave.component';

@NgModule({
  declarations: [
    AppComponent,
    HrAdminComponent,
    ManagerComponent,
    MemberComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    CreateLeaveComponent,
    ViewLeavesComponent,
    ApproveRejectLeaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
