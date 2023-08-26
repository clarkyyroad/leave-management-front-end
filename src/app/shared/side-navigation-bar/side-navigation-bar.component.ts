import {Component, OnInit} from '@angular/core';
import {IEmployeeList} from "../../hr-admin/model/employee-list.model";
import {EmployeeService} from "../../hr-admin/service/employee.service";
import {RouterService} from "../../hr-admin/service/router.service";

@Component({
  selector: 'app-side-navigation-bar',
  templateUrl: './side-navigation-bar.component.html',
  styleUrls: ['./side-navigation-bar.component.css']
})
export class SideNavigationBarComponent implements OnInit {

  public employeeList: IEmployeeList[] = [];

  constructor(private employeeService: EmployeeService, private routerService: RouterService) {
  }

  ngOnInit() {
    this.initializeListEmployees();
  }

  private initializeListEmployees() {
    this.employeeService.getEmployeeList().subscribe({
      next: (data: IEmployeeList[]) => {
        this.employeeList = data;
        console.log('Response:', data);
      }
    });
  }
}
