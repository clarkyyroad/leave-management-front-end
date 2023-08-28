import { Component } from '@angular/core';
import {IPageResponse} from "./model/page-response.model";
import {IEmployee} from "./model/employee.model";
import {RouterService} from "./service/router.service";
import {EmployeeService} from "./service/employee.service";

@Component({
  selector: 'app-hr-admin',
  templateUrl: './hr-admin.component.html',
  styleUrls: ['./hr-admin.component.css']
})
export class HrAdminComponent {

  public employeesInPage: IPageResponse = {
    totalNumber: 0,
    pageNumber: 0,
    content: []
  }

  constructor(private empoyeeService: EmployeeService, private routerService: RouterService ) {
  }

  public editEmployee(id: any){
    this.routerService.navigate('hr-admin/edit', {'id': id})
  }
}
