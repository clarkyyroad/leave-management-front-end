import {Component} from '@angular/core';
import {LeaveResponse} from "../../leave/leave-model/leave-response.model";
import {LeaveService} from "../../leave/leave-service/leave.service";
import {RouterService} from "../router-service/router.service";

import {EmployeeService} from "../../employee/employee-service/employee.service";
import {LeavePageResponseModel} from "../../leave/leave-model/leave-page-response.model";

@Component({
    selector: 'app-view-leaves',
    templateUrl: './view-leaves.component.html',
    styleUrls: ['./view-leaves.component.css']
})
export class ViewLeavesComponent {

    public leavesInPage: LeavePageResponseModel = {
        totalCount: 0,
        pageNumber: 0,
        content: []
    }
    public dataInfo: boolean = false;

    userName ='';
    public readonly MAX_LIMIT: number = 5;
    public currentLeaves: number = 0;
    public totalLeaves: number = 0;
    private page: number = 1;
    private employeeId: number = 0;


    public cancelButton: boolean = true;
    private leaveStatus: string = '';

    constructor(private leaveService: LeaveService, private employeeService: EmployeeService, private routerService: RouterService) {
       const storedUserId = localStorage.getItem('userId');
       this.employeeId = storedUserId ? parseInt(storedUserId) : 0;
       const storedUserName = localStorage.getItem('userName');
       this.userName = storedUserName || 'Null';
    }
    ngOnInit() {
        this.fetchMyLeaves();
        this.fetchEmployee();
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
                    if (Array.isArray(data.content) && data.content.length > 0) {
                        for (const item of data.content) {
                            console.log('Leave Status:', item.leaveStatus);
                            if(item.leaveStatus === "PENDING"){
                                this.cancelButton = true;
                            }
                        }
                    } else {
                        console.log('Content is empty or not an array.');
                    }
                }
            });
    }

    private  fetchEmployee(){
        this.employeeService.getEmployee(this.employeeId)
            .subscribe({
                next: (data: any) => {
                    this.currentLeaves = data.currentLeaves;
                    this.totalLeaves = data.totalLeaves;
                }
            })
    }

    logout() {
        localStorage.clear();
        this.routerService.navigate('/landing/').then(() => console.log('Navigation successful'))
            .catch((error) => console.error('Navigation error: ', error))
    }



    // private fetchUsedLeaves(){
    //   this.employeeService.
    // }
}
