import {Component, OnInit} from '@angular/core';
import {IPageResponse} from "../employee-model/page-response.model";
import {RouterService} from "../../shared/router-service/router.service";
import {EmployeeService} from "../employee-service/employee.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hr-admin',
  templateUrl: './hr-admin.component.html',
  styleUrls: ['./hr-admin.component.css']
})
export class HrAdminComponent implements OnInit {

  public employeesInPage: IPageResponse = {
    totalNumber: 0,
    pageNumber: 0,
    content: []
  }
  private readonly MAX_LIMIT: number = 10;
  userName: string = '';

  constructor(private routerService: RouterService, private employeeService: EmployeeService, private route: Router) {
    const storedUserName = localStorage.getItem('userName');
    this.userName = storedUserName || 'Unknown User';
  }

  ngOnInit() {
    this.initializeEmployees();
  }

  private initializeEmployees() {
    this.employeeService.getEmployees(this.MAX_LIMIT, this.employeesInPage.pageNumber).subscribe({
      next: (data: IPageResponse) => {
        console.log('Response: ', data);
        this.employeesInPage.content = data.content;
        this.employeesInPage.pageNumber = data.pageNumber;
        this.employeesInPage.totalNumber = data.totalNumber;
      }
    });
  }

  public addEmployee(): void {
    this.routerService.navigate('/hr-admin/add-employee').then(() => console.log('Navigation successful'))
        .catch((error) => console.error('Navigation error: ', error));
  }

  public editEmployee(id: any) {
    this.routerService.navigate('hr-admin/edit', {'id': id})
  }
}
