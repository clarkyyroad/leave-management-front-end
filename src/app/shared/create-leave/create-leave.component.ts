import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LeaveService} from "../../leave/leave-service/leave.service";
import {Router} from "@angular/router";
import {ILeave} from "../../leave/leave-model/leave.model";
import {RouterService} from "../router-service/router.service";
import {IEmployee} from "../../employee/employee-model/employee.model";

@Component({
  selector: 'app-create-leave',
  templateUrl: './create-leave.component.html',
  styleUrls: ['./create-leave.component.css']
})
export class CreateLeaveComponent {
  public addLeaveForm: FormGroup;

  constructor(private leaveService: LeaveService, private routerService: RouterService, private router: Router) {
    const employee : IEmployee = this.routerService.getQueryParams().user;

    this.addLeaveForm = new FormGroup<any>({
      id: new FormControl(employee.id),
      startDate: new FormControl  (''),
      endDate: new FormControl (''),
      reason: new FormControl ('')
    })
  }

  public addLeave(){
    const formValue: ILeave = this.addLeaveForm.getRawValue();

    this.leaveService.saveLeave(formValue)
        .subscribe({next: () => {
          this.router.navigate(['/'])
          }})
  }
}
