import {Component} from '@angular/core';
import {LeaveService} from "../../leave/leave-service/leave.service";
import {LeavePageResponseModel} from "../../leave/leave-model/leave-page-response.model";
import {RouterService} from "../../shared/router-service/router.service";
import {ILeave} from "../../leave/leave-model/leave.model";


@Component({
    selector: 'app-manager',
    templateUrl: './manager.component.html',
    styleUrls: ['./manager.component.css']
})
export class ManagerComponent {
    public leavesInPage: LeavePageResponseModel = {
        totalCount: 0,
        pageNumber: 0,
        content: []
    }

    userName: string = '';
    userId: number = 0;
    private readonly MAX_LIMIT: number = 10;

    constructor(private routerService: RouterService, private leaveService: LeaveService) {
        const storedUserName = localStorage.getItem('userName');
        const storedUserId = localStorage.getItem('userId');
        this.userId = storedUserId ? parseInt(storedUserId) : 0;
        this.userName = storedUserName || 'Null';
    }

    ngOnInit() {
        this.initializeLeaves();
    }
    approveLeave(leaveId: number) {
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

    private initializeLeaves() {
        console.log(this.userId);
        this.leaveService.fetchLeavesUnderManager(this.MAX_LIMIT, 1, this.userId).subscribe({
            next: (data: LeavePageResponseModel) => {
                console.log('Response: ', data);
                this.leavesInPage.content = data.content;
                this.leavesInPage.pageNumber = data.pageNumber;
                this.leavesInPage.totalCount = data.totalCount;
            }
        });
    }
}
