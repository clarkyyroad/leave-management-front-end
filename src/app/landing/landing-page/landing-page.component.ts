import {Component, OnInit} from '@angular/core';
import {IUsers} from "../../employee/employee-model/employee-list.model";

import {RouterService} from "../../shared/router-service/router.service";
import {EmployeeService} from "../../employee/employee-service/employee.service";


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  public users: IUsers[] = [];
  public selectedUser: string = '';
  showModal: boolean = false;

  constructor(private routerService: RouterService, private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.initializeUser();
  }

  public getUserPath(): void {
    const user = this.users.find(u => u.roleType === this.selectedUser);
    if (!this.selectedUser) {
      this.showModal = true;
    } else {
      if (this.selectedUser === 'HR_ADMIN' && user) {
        localStorage.setItem('userName', user?.name || '')
        this.routerService.navigate('/hr-admin/')
            .then(() => console.log('Navigation successful'))
            .catch((error) => console.error('Navigation error: ', error));
      } else if (this.selectedUser === 'MANAGER') {
        this.routerService.navigate('/manager/').then(() => console.log('Navigation successful'))
          .catch((error) => console.error('Navigation error: ', error));
      } else if (this.selectedUser === 'MEMBER') {
        this.routerService.navigate('/member/').then(() => console.log('Navigation successful'))
          .catch((error) => console.error('Navigation: ', error));
      }
    }
  }

  closeModal() {
    this.showModal = false;
  }

  private initializeUser() {
    this.employeeService.getUsers().subscribe({
      next: (data: IUsers[]): void => {
        this.users = data;
        console.log('Response: ', data)
      }
    });
  }
}
