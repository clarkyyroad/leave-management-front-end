import {Component, OnInit} from '@angular/core';
import {IUsers} from "../../employee/employee-model/employee-list.model";
import {EmployeeService} from "../../employee/employee-service/employee.service";
import {RouterService} from "../router-service/router.service";


@Component({
  selector: 'app-side-navigation-bar',
  templateUrl: './side-navigation-bar.component.html',
  styleUrls: ['./side-navigation-bar.component.css']
})
export class SideNavigationBarComponent implements OnInit {


  public employeeList: IUsers[] = [];

  constructor(private employeeService: EmployeeService, private routerService: RouterService) {
  }

  ngOnInit() {
    this.initializeListEmployees();
  }

  onUserSelection(event: any): void {
    const selectedValue = event.target.value;
    const roleType = selectedValue.split(' ')[1].slice(1, -1);
    if (roleType === 'HR_ADMIN') {
      this.routerService.navigate('/hr-admin/', {'id': 1}).then(() => console.log('Navigation successful'))
        .catch((error) => console.error('Navigation error: ', error));
    }
  }

  private initializeListEmployees() {
    this.employeeService.getEmployeeList().subscribe({
      next: (data: IUsers[]) => {
        this.employeeList = data;
        console.log('Response:', data);
      }
    });
  }
}
