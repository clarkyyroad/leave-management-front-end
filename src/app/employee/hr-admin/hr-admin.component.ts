import {Component, OnInit} from '@angular/core';
import {IEmployeePageResponse} from "../employee-model/employee-page-response.model";
import {RouterService} from "../../shared/router-service/router.service";
import {EmployeeService} from "../employee-service/employee.service";

@Component({
  selector: 'app-hr-admin',
  templateUrl: './hr-admin.component.html',
  styleUrls: ['./hr-admin.component.css']
})
export class HrAdminComponent implements OnInit {

  public employeesInPage: IEmployeePageResponse = {
    totalCount: 0,
    pageNumber: 0,
    content: []
  }
  userName: string = '';
  userId: number;
  readonly MAX_LIMIT: number = 5;
  currentPage: number = 1;
  totalPages!: number;

  constructor(private routerService: RouterService, private employeeService: EmployeeService) {
    const storedUserName = localStorage.getItem('userName');
    const storedUserId = localStorage.getItem('userId');
    this.userName = storedUserName || 'Unknown User';
    this.userId = storedUserId ? parseInt(storedUserId) : 0;
  }

  ngOnInit() {
    this.initializeEmployees();
    console.log(localStorage.getItem('userName'))
    console.log(this.userId)
  }

  public addEmployee(): void {
    this.routerService.navigate('/hr-admin/add-employee').then(() => console.log('Navigation successful'))
      .catch((error) => console.error('Navigation error: ', error));
  }

  logout() {
    localStorage.clear()
    this.routerService.navigate('/landing/').then(() => console.log('Navigation successful'))
      .catch((error) => console.error('Navigation error: ', error))
  }

  viewAllEmployee() {
    this.routerService.navigate('/hr-admin/')
      .then(() => console.log('Navigation successful'))
      .catch((error) => console.log('Navigation error: ', error));
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.initializeEmployees();
    }
  }

  private initializeEmployees() {
    this.employeeService.getEmployees(this.MAX_LIMIT, this.currentPage).subscribe({
      next: (data: IEmployeePageResponse) => {
        console.log('Response: ', data);
        this.employeesInPage.totalCount = data.totalCount;
        this.employeesInPage.pageNumber = data.pageNumber;
        this.employeesInPage.content = data.content;
        this.totalPages = Math.ceil(data.totalCount / this.MAX_LIMIT);
      }
    });
  }
}
