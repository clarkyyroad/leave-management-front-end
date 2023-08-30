import {Component} from '@angular/core';
import {RouterService} from "../../shared/router-service/router.service";
import {EmployeeService} from "../employee-service/employee.service";
import {LeaveService} from "../../leave/leave-service/leave.service";
import {LeavePageResponseModel} from "../../leave/leave-model/leave-page-response.model";

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.css']
})
export class MemberComponent {
    public leavesInPage: LeavePageResponseModel = {
        content: [],
        pageNumber: 0,
        totalCount: 0
    }


    public dataInfo: boolean = true;
    public readonly MAX_LIMIT: number = 5;
    public usedLeaves: number = 0;
    public availableLeaves: number = 0;
    public userName: string = '';
    public userID: number;
    public cancelButton: boolean = false;
    private page: number = 1;

    constructor(private leaveService: LeaveService, private employeeService: EmployeeService, private routerService: RouterService) {
        const storedUserName = localStorage.getItem('userName');
        const storedUserId = localStorage.getItem('userId');
        this.userName = storedUserName || 'Unknown User';
        this.userID = storedUserId ? parseInt(storedUserId) : 0;
    }

    ngOnInit() {
        this.fetchMyLeaves();
    }

    public getEmployeeInfo() {
        this.employeeService.getEmployee(this.userID)
            .subscribe({
                next: (data) => {
                    console.log(data);
                    this.usedLeaves = data.totalLeaves;
                    this.availableLeaves = data.currentLeaves;
                }
            });
    }

    public cancelLeave(id: number) {
        this.leaveService.cancelLeave(id)
            .subscribe({
                next: (data) => {
                    console.log('Leave successfully cancelled: ', data);

                }, error: (err) => {

                    console.log('An error occurred while cancelling leave');
                }
            });
    }

    private fetchMyLeaves() {
        this.leaveService.fetchEmployeeLeaves(this.MAX_LIMIT, this.page, this.userID).subscribe({
            next: (data: any) => {
                console.log('Response', data);
                this.leavesInPage.totalCount = data.totalCount;
                this.leavesInPage.pageNumber = data.pageNumber;
                this.leavesInPage.content = data.content;
                this.dataInfo = data.content.totalCount == 0;
                this.cancelButton = data.content.leaveStatus == "CANCELLED";
            }
        });
    }
}
