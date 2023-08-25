import {Component} from '@angular/core';
import {RoleType} from "./role-type.enum";

@Component({
  selector: 'app-side-navigation-bar',
  templateUrl: './side-navigation-bar.component.html',
  styleUrls: ['./side-navigation-bar.component.css']
})
export class SideNavigationBarComponent {

  private member: RoleType = RoleType.MEMBER;
}
