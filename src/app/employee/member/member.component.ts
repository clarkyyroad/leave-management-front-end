import {Component} from '@angular/core';
import {RouterService} from "../../shared/router-service/router.service";
import {EmployeeService} from "../employee-service/employee.service";
import {LeaveService} from "../../leave/leave-service/leave.service";
import {LeavePageResponseModel} from "../../leave/leave-model/leave-page-response.model";
import {IEmployeePageResponse} from "../employee-model/employee-page-response.model";

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


    public leavesInfo: boolean = false;
    public readonly MAX_LIMIT: number = 5;
    public usedLeaves: number = 0;
    public availableLeaves: number = 0;
    public userName: string = '';
    public userId: number;
    public cancelButton: boolean = false;
    private page: number = 1;
    currentPage: number = 1;
    totalPages!: number;

    constructor(private leaveService: LeaveService, private employeeService: EmployeeService, private routerService: RouterService) {
        const storedUserName = localStorage.getItem('userName');
        const storedUserId = localStorage.getItem('userId');
        this.userName = storedUserName || 'Unknown User';
        this.userId = storedUserId ? parseInt(storedUserId) : 0;
    }

    ngOnInit() {
        this.fetchMyLeaves();
        this.getEmployeeInfo();
    }

    public getEmployeeInfo() {
        this.employeeService.getEmployee(this.userId)
            .subscribe({
                next: (data: any) => {
                    console.log(data);
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

    logout() {
        localStorage.clear()
        this.routerService.navigate('/landing/').then(() => console.log('Navigation successful'))
            .catch((error) => console.error('Navigation error: ', error))
    }

    private fetchMyLeaves() {
        console.log(this.userId);
        this.leaveService.fetchEmployeeLeaves(this.MAX_LIMIT, this.page, this.userId).subscribe({
            next: (data: any) => {
                console.log('Response', data);
                this.usedLeaves = data.totalCount;
                this.leavesInPage.totalCount = data.totalCount;
                this.leavesInPage.pageNumber = data.pageNumber;
                this.leavesInPage.content = data.content;
                this.leavesInfo = data.totalCount == 0;
            }
        });
    }

    public createLeave(){
      this.routerService.navigate('/member/apply/').then(() => console.log('Navigation successful'))
        .catch((error) => console.error('Navigation error: ', error));
    }

    goToPage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.fetchMyLeaves();
      }
  }
}
