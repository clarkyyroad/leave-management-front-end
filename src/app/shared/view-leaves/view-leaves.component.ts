import {Component} from '@angular/core';
import {LeaveResponse} from "../../leave/leave-model/leave-response.model";
import {LeaveService} from "../../leave/leave-service/leave.service";
import {RouterService} from "../router-service/router.service";
import {EmployeeService} from "../../employee/employee-service/employee.service";

@Component({
    selector: 'app-view-leaves',
    templateUrl: './view-leaves.component.html',
    styleUrls: ['./view-leaves.component.css']
})
export class ViewLeavesComponent {

    public leavesInPage: LeaveResponse = {
        content: [],
        pageNumber: 0,
        totalCount: 0
    }


    public dataInfo: boolean = false;

    public readonly MAX_LIMIT: number = 5;
    public usedLeaves: number = 0;
    public availableLeaves: number = 0;
    public cancelButton: boolean = true;
    private page: number = 1;
    private employeeId: number = 0;

    constructor(private leaveService: LeaveService, private employeeService: EmployeeService, private routerService: RouterService) {
        this.usedLeaves = this.routerService.getQueryParams().user.totalLeaves;
        this.availableLeaves = this.routerService.getQueryParams().user.currentLeaves;
        this.employeeId = this.routerService.getQueryParams().user.id;
    }

    ngOnInit() {
        this.fetchMyLeaves();
    }

    public cancelLeave(id: number) {
        this.leaveService.cancelLeave(id)
            .subscribe({
                next: (data) => {
                    console.log('Leave successfully cancelled: ', data);

                    this.cancelButton = data.leaveStatus == "CANCELLED";

                }, error: (err) => {

                    console.log('An error occurred while cancelling leave');
                }
            });
    }

    private fetchMyLeaves() {
        this.leaveService.fetchEmployeeLeaves(this.MAX_LIMIT, this.page, this.employeeId)
            .subscribe({
                next: (data: any) => {
                    console.log('Response', data);

                    this.leavesInPage = data;

                    this.dataInfo = data.totalCount == 0;
                }
            });
    }

    // private fetchUsedLeaves(){
    //   this.employeeService.
    // }
}
