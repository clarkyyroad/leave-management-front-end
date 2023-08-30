import {Component} from '@angular/core';
import {LeaveResponse} from "../../leave/leave-model/leave-response.model";
import {LeaveService} from "../../leave/leave-service/leave.service";
import {RouterService} from "../router-service/router.service";
import {LeavePageResponseModel} from "../../leave/leave-model/leave-page-response.model";

@Component({
    selector: 'app-view-leaves',
    templateUrl: './view-leaves.component.html',
    styleUrls: ['./view-leaves.component.css']
})
export class ViewLeavesComponent {

    public leavesInPage: LeavePageResponseModel = {
        totalNumber: 0,
        pageNumber: 0,
        content: []
    }

    public readonly MAX_LIMIT: number = 5;
    private page: number = 1;

    userId: number = 0;

    constructor(private leaveService: LeaveService, private routerService: RouterService) {
        const employee : any = this.routerService.getQueryParams().user;
        this.userId = employee.id;
    }
    ngOnInit() {
        this.initializeLeaves();
    }

    private initializeLeaves() {
        this.leaveService.fetchEmployeeLeaves(this.MAX_LIMIT, 1, this.userId).subscribe({
            next: (data: LeavePageResponseModel) => {
                console.log('Response: ', data);
                this.leavesInPage.content = data.content;
                this.leavesInPage.pageNumber = data.pageNumber;
                this.leavesInPage.totalNumber = data.totalNumber;
            }
        });
    }
}
