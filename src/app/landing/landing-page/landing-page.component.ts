import { Component } from '@angular/core';
import {RoleType} from "../../shared/side-navigation-bar/role-type.enum";
import {RouterService} from "../../service/router.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  public member: RoleType = RoleType.MEMBER

  public manager: RoleType = RoleType.MANAGER
  public admin: RoleType = RoleType.ADMIN


  public user1 = "Dexter Sy"
  public user2 = "Romeo"
  public user3 = "Clark"
  public user4 = "Carli"



  constructor(private routerService: RouterService) {
  }

  public getAdminPath(){
    this.routerService.navigate('/hr-admin/',  {'id': 1})
  }

  public getManagerPath(){
    this.routerService.navigate('/manager/',  {'id': 1})
  }
  public getMemberPath(){
    this.routerService.navigate('/member/',  {'id': 1})
  }


}
