<<<<<<< HEAD
import {Component} from '@angular/core';
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

    userName = '';
    public readonly MAX_LIMIT: number = 5;
    public currentLeaves: number = 0;
    public totalLeaves: number = 0;
    public cancelButton: boolean = false;
    public page: number = 1;
    totalPages!: number;
    private employeeId: number = 0;

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

    next() {
        this.page += 1;
        this.ngOnInit();
    }

    back() {
        this.page -= 1;
        this.ngOnInit();
    }


    public cancelLeave(id: number) {
        this.leaveService.cancelLeave(id)
            .subscribe({
                next: (data) => {
                    console.log('Leave successfully cancelled: ', data);
                    this.ngOnInit();
                }, error: (err) => {

                    console.log('An error occurred while cancelling leave');
                }
            });
    }

    logout() {
        localStorage.clear();
        this.routerService.navigate('/landing/').then(() => console.log('Navigation successful'))
            .catch((error) => console.error('Navigation error: ', error))
    }

    private fetchMyLeaves() {
        this.leaveService.fetchEmployeeLeaves(this.MAX_LIMIT, this.page, this.employeeId)
            .subscribe({
                next: (data: any) => {
                    console.log('Response', data);
                    this.leavesInPage = data;
                    this.dataInfo = data.totalCount == 0;
                    this.totalPages = Math.ceil(data.totalCount / this.MAX_LIMIT);
                }
            });
    }

    private fetchEmployee() {
        this.employeeService.getEmployee(this.employeeId)
            .subscribe({
                next: (data: any) => {
                    this.currentLeaves = data.currentLeaves;
                    this.totalLeaves = data.totalLeaves;
                }
            })
    }
}
