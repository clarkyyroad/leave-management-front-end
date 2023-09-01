import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HrAdminComponent} from './employee/hr-admin/hr-admin.component';
import {ManagerComponent} from './employee/manager/manager.component';
import {MemberComponent} from './employee/member/member.component';
import {AddEmployeeComponent} from './employee/hr-admin/add-employee/add-employee.component';
import {EditEmployeeComponent} from './employee/hr-admin/edit-employee/edit-employee.component';
import {CreateLeaveComponent} from './shared/create-leave/create-leave.component';
import {ViewLeavesComponent} from './shared/view-leaves/view-leaves.component';
import {NgOptimizedImage} from "@angular/common";
import {SideNavigationBarComponent} from './shared/side-navigation-bar/side-navigation-bar.component';
import {LoginPageComponent} from './login/login-page/login-page.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserSelectionModalComponent} from './shared/user-selection-modal/user-selection-modal.component';
import {ApproveRejectLeaveComponent} from "./employee/hr-admin/approve-reject-leave/approve-reject-leave.component";
import {ConfirmationModalComponent} from './shared/confirmation-modal/confirmation-modal.component';
import {ErrorModalComponent} from './shared/error-modal/error-modal.component';

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
        SideNavigationBarComponent,
        LoginPageComponent,
        UserSelectionModalComponent,
        ApproveRejectLeaveComponent,
        ConfirmationModalComponent,
        ErrorModalComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgOptimizedImage,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}