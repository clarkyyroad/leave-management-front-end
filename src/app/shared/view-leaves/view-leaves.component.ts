import {Component} from '@angular/core';
import {LeaveResponse} from "../../leave/leave-model/leave-response.model";
import {LeaveService} from "../../leave/leave-service/leave.service";
import {RouterService} from "../router-service/router.service";

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
  public readonly MAX_LIMIT: number = 5;
  private page: number = 1;
  private employeeId: number = 3;

  constructor(private leaveService: LeaveService, private routerService: RouterService) {
  }

  ngOnInit(){
    this.fetchMyLeaves();
  }

    private fetchMyLeaves(){
      this.leaveService.fetchEmployeeLeaves(this.MAX_LIMIT, this.page, this.employeeId)
        .subscribe({next: (data: any) =>{
          console.log('Response', data);

          this.leavesInPage = data;
          }});
    }
}
