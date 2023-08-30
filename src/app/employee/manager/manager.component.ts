import {Component} from '@angular/core';
import {LeaveService} from "../../leave/leave-service/leave.service";


@Component({
    selector: 'app-manager',
    templateUrl: './manager.component.html',
    styleUrls: ['./manager.component.css']
})
export class ManagerComponent {
  
  public MAX_LIMIT : number = 10;
  public page : number = 1;
  
  constructor(private leaveService: LeaveService) {
  }
}
