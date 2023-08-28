import {Component} from '@angular/core';
import {RoleType} from "./role-type.enum";
import {RouterService} from "../../service/router.service";
import {Employee} from "../../model/employee.model";

@Component({
  selector: 'app-side-navigation-bar',
  templateUrl: './side-navigation-bar.component.html',
  styleUrls: ['./side-navigation-bar.component.css']
})
export class SideNavigationBarComponent {

  public member: RoleType = RoleType.MEMBER

  public manager: RoleType = RoleType.MANAGER
  public admin: RoleType = RoleType.ADMIN


  public user1 = "Dexter Sy"
  public user2 = "Romeo"
  public user3 = "Clark"
  public user4 = "Carli"

}
