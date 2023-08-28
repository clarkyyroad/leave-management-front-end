import { Component } from '@angular/core';
import {LeaveResponse} from "../../hr-admin/model/leave-list.model";
import {Route} from "@angular/router";
import {RouterService} from "../../service/router.service";

@Component({
  selector: 'app-view-leaves',
  templateUrl: './view-leaves.component.html',
  styleUrls: ['./view-leaves.component.css']
})
export class ViewLeavesComponent {

  private page: number = 1;

  public leavesInPage: LeaveResponse = {
    content: [],
    pageNumber: 0,
    totalCount: 0
  }

  public readonly MAX_LIMIT: number = 5;

  constructor(private leaveService: LeaveService, private routerService: RouterService) {
  }
}
