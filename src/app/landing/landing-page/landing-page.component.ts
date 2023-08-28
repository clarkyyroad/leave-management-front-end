import {Component, OnInit} from '@angular/core';
import {RouterService} from "../../service/router.service";
import {IUsers} from "../../hr-admin/model/employee-list.model";
import {LandingPageService} from "../services/landing-page.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  public users: IUsers[] = [];
  public selectedUser: string = '';

  constructor(private routerService: RouterService, private landingPageService: LandingPageService) {
  }

  ngOnInit() {
    this.initializeUser();
  }

  private initializeUser() {
    this.landingPageService.getUser().subscribe({
      next: (data: IUsers[]): void => {
        this.users = data;
        console.log('Response: ', data)
      }
    });
  }

  public getUserPath(): void{
    if (this.selectedUser === 'HR_ADMIN') {
      this.routerService.navigate('/hr-admin/').then(() => console.log('Navigation successful'))
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
