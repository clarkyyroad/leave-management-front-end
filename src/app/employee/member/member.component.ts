import {Component} from '@angular/core';
import {RouterService} from "../../shared/router-service/router.service";
import {EmployeeService} from "../employee-service/employee.service";
import {LeaveResponse} from "../../leave/leave-model/leave-response.model";
import {LeaveService} from "../../leave/leave-service/leave.service";
import {ILeave} from "../../leave/leave-model/leave.model";
import {IEmployee} from "../employee-model/employee.model";
import {IUsers} from "../employee-model/employee-list.model";

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.css']
})
export class MemberComponent {
  public leavesInPage: LeaveResponse = {
    content: [],
    pageNumber: 0,
    totalCount: 0
  }


  public dataInfo: boolean = true;

  public readonly MAX_LIMIT: number = 5;
  private page: number = 1;
  public usedLeaves: number = 0 ;
  public availableLeaves: number = 0;
  public userName: string = '';
  public userID: number;

  public cancelButton: boolean = false;

  constructor(private leaveService: LeaveService, private employeeService: EmployeeService, private routerService: RouterService) {
    const storedUserName = localStorage.getItem('userName');
    const storedUserId = localStorage.getItem('userId');
    this.userName = storedUserName || 'Unknown User';
    this.userID = storedUserId ? parseInt(storedUserId) : 0;
  }

  ngOnInit() {
    this.fetchMyLeaves();
    this.getEmployeeInfo();
    console.log( localStorage.getItem('userId'));
    console.log(localStorage.getItem('userName'));
  }

  private fetchMyLeaves(){
    this.leaveService.fetchEmployeeLeaves(this.MAX_LIMIT, this.page, this.userID)
      .subscribe({next: (data: any) =>{
          console.log('Response', data);

          this.leavesInPage = data;
          this.dataInfo = data.content.totalCount == 0;
          this.cancelButton = data.content.leaveStatus == "CANCELLED";
        }});
  }

  public getEmployeeInfo(){
    this.employeeService.getEmployee(this.userID)
      .subscribe({next: (data) => {
        console.log(data);

        this.usedLeaves = data.totalLeaves;
        this.availableLeaves = data.currentLeaves;
        }});
  }

  public cancelLeave(id: number){
    this.leaveService.cancelLeave(id)
      .subscribe({next: (data) => {
          console.log('Leave successfully cancelled: ', data);

        }, error: (err) =>{

          console.log('An error occurred while cancelling leave');
        }});
  }

}
