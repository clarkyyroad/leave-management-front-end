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
        totalNumber: 0,
        pageNumber: 0,
        content: []
    }
    userName: string = '';
    private readonly MAX_LIMIT: number = 10;

    constructor(private routerService: RouterService, private employeeService: EmployeeService) {
        const storedUserName = localStorage.getItem('userName');
        this.userName = storedUserName || 'Unknown User';
    }

    ngOnInit() {
        this.initializeEmployees();
    }

    public addEmployee(): void {
        this.routerService.navigate('/hr-admin/add-employee').then(() => console.log('Navigation successful'))
            .catch((error) => console.error('Navigation error: ', error));
    }

    public editEmployee(id: any) {
        this.routerService.navigate('hr-admin/edit', {'id': id})
    }

    logout() {
        sessionStorage.clear()
        this.routerService.navigate('/landing/').then(() => console.log('Navigation successful'))
            .catch((error) => console.error('Navigation error: ', error))
    }

    viewAllEmployee() {
        this.routerService.navigate('/hr-admin/')
            .then(() => console.log('Navigation successful'))
            .catch((error) => console.log('Navigation error: ', error));
    }

    private initializeEmployees() {
        this.employeeService.getEmployees(this.MAX_LIMIT, 1).subscribe({
            next: (data: IEmployeePageResponse) => {
                console.log('Response: ', data);
                this.employeesInPage.content = data.content;
                this.employeesInPage.pageNumber = data.pageNumber;
                this.employeesInPage.totalNumber = data.totalNumber;
            }
        });
    }
}
