import {Component} from '@angular/core';
import {RouterService} from "../../shared/router-service/router.service";
import {EmployeeService} from "../employee-service/employee.service";
import {LeaveResponse} from "../../leave/leave-model/leave-response.model";
import {LeaveService} from "../../leave/leave-service/leave.service";
import {ILeave} from "../../leave/leave-model/leave.model";
import {IEmployee} from "../employee-model/employee.model";

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
  public userID: number = 0;

  public cancelButton: boolean = false;

  constructor(private leaveService: LeaveService, private employeeService: EmployeeService, private routerService: RouterService) {
    this.userName = this.routerService.getQueryParams().user.name;
    this.userID = this.routerService.getQueryParams().user.id;
  }

  ngOnInit(){
    this.fetchMyLeaves();
    this.getEmployeeInfo();
  }

  private fetchMyLeaves(){
    this.leaveService.fetchEmployeeLeaves(this.MAX_LIMIT, this.page, this.userID)
      .subscribe({next: (data: any) =>{
          console.log('Response', data);

          this.leavesInPage = data;
          this.dataInfo = data.totalCount == 0;
          this.cancelButton = data.leaveStatus == "CANCELLED";
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
