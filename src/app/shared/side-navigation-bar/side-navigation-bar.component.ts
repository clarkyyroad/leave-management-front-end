import {Component} from '@angular/core';
import {LeaveService} from "../../leave/leave-service/leave.service";
import {EmployeeService} from "../../employee/employee-service/employee.service";
import {RouterService} from "../router-service/router.service";

@Component({
    selector: 'app-side-navigation-bar',
    templateUrl: './side-navigation-bar.component.html',
    styleUrls: ['./side-navigation-bar.component.css']
})
export class SideNavigationBarComponent {
    manager: boolean = false;
    member: boolean = false;
    hradmin: boolean = false;

    userRole: string = '';
    roleType: string = '';
    userName: string = '';

    constructor(private leaveService: LeaveService, private employeeService: EmployeeService, private routerService: RouterService) {
        const storedUserRole = localStorage.getItem("userRole");
        const storedUserName = localStorage.getItem("userName");
        this.userName = storedUserName || 'Null';
        this.roleType = storedUserRole || 'Null';
        this.userRole = this.toSentenceCase(this.roleType);
        if (this.roleType == "MANAGER") {
            this.manager = true;
        } else if (this.roleType == "MEMBER") {
            this.member = true;
        } else if (this.roleType == "HR_ADMIN") {
            this.hradmin = true;
        }
    }

    toSentenceCase(inputString: string): string {
        const words = inputString.split(/\s+/);
        const sentenceCaseWords = words.map((word) =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );
        return sentenceCaseWords.join(' ');
    }

    viewAllEmployeeUnderManager() {
        this.routerService.navigate('/manager/')
            .then(() => console.log('Navigation successful'))
            .catch((error) => console.log('Navigation error: ', error));
    }

    createLeave(): void {
      if(this.roleType == "MANAGER"){
        this.routerService.navigate('/manager/apply')
          .then(() => console.log('Navigation successful'))
          .catch((error) => console.log('Navigation error: ', error));
      }else {
        this.routerService.navigate('/member/apply')
          .then(() => console.log('Navigation successful'))
          .catch((error) => console.log('Navigation error: ', error));
      }

    }

    viewMyLeaves() {
        this.routerService.navigate('/manager/my-leaves/')
            .then(() => console.log('Navigation successful'))
            .catch((error) => console.log('Navigation error: ', error));
    }

    public addEmployee(): void {
        this.routerService.navigate('/hr-admin/add-employee').then(() => console.log('Navigation successful'))
            .catch((error) => console.error('Navigation error: ', error));
    }

    viewAllEmployee() {
        this.routerService.navigate('/hr-admin/')
            .then(() => console.log('Navigation successful'))
            .catch((error) => console.log('Navigation error: ', error));
    }


    logout() {
        localStorage.clear();
        this.routerService.navigate('/landing/').then(() => console.log('Navigation successful'))
            .catch((error) => console.error('Navigation error: ', error))
    }


}
