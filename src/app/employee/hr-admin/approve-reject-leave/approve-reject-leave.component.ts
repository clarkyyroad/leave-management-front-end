import {Component, OnInit} from '@angular/core';
import {RouterService} from "../../../shared/router-service/router.service";
import {LeaveService} from "../../../leave/leave-service/leave.service";
import {LeavePageResponseModel} from "../../../leave/leave-model/leave-page-response.model";
import {ILeave} from "../../../leave/leave-model/leave.model";

@Component({
    selector: 'app-approve-reject-leave',
    templateUrl: './approve-reject-leave.component.html',
    styleUrls: ['./approve-reject-leave.component.css']
})

export class ApproveRejectLeaveComponent implements OnInit {

    public leavesInPage: LeavePageResponseModel = {
        totalNumber: 0,
        pageNumber: 0,
        content: []
    }
    userName: string = '';
    private readonly MAX_LIMIT: number = 10;

    constructor(private routerService: RouterService, private leaveService: LeaveService) {
        const storedUserName = localStorage.getItem('userName');
        this.userName = storedUserName || 'Unknown User';
    }

    ngOnInit() {
        this.initializeLeaves();
    }

    logout() {
        sessionStorage.clear()
        this.routerService.navigate('/landing/').then(() => console.log('Navigation successful'))
            .catch((error) => console.error('Navigation error: ', error))
    }

    approveLeave(leaveId: any) {
        this.leaveService.approveLeave(leaveId).subscribe({
            next: (data: ILeave) => {
                console.log('Response ', data);
                this.initializeLeaves();
            }
        });
    }

    rejectLeave(leaveID: number) {
        this.leaveService.rejectLeave(leaveID).subscribe({
            next: (data: ILeave) => {
                console.log('Response ', data);
                this.initializeLeaves();
            }
        });
    }

    viewAllEmployee() {
        this.routerService.navigate('/hr-admin/').then(() => console.log('Navigation successful'))
            .catch((error) => console.error('Navigation error: ', error));
    }

    viewAllLeaves() {
        this.routerService.navigate('hr-admin/leaves').then(() => console.log('Navigation successful'))
            .catch((error) => console.error('Navigation error: ', error));
    }

    private initializeLeaves() {
        this.leaveService.fetchAllLeaves(this.MAX_LIMIT, 1).subscribe({
            next: (data: LeavePageResponseModel) => {
                console.log('Response: ', data);
                this.leavesInPage.content = data.content;
                this.leavesInPage.pageNumber = data.pageNumber;
                this.leavesInPage.totalNumber = data.totalNumber;
            }
        });
    }
}
