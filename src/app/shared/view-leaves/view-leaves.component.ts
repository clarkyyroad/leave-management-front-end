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

  constructor(private leaveService: LeaveService, private routerService: RouterService) {
  }
}
