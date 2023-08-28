import {Component} from '@angular/core';
import {IPageResponse} from "../employee-model/page-response.model";
import {RouterService} from "../../shared/router-service/router.service";

@Component({
  selector: 'app-hr-admin',
  templateUrl: './hr-admin.component.html',
  styleUrls: ['./hr-admin.component.css']
})
export class HrAdminComponent {

  public employeesInPage: IPageResponse = {
    totalNumber: 0,
    pageNumber: 0,
    content: []
  }
  userName?: string;

  constructor(private routerService: RouterService) {
    const userName = this.routerService.getQueryParams();
    this.userName = userName.name;
  }

  public editEmployee(id: any) {
    this.routerService.navigate('hr-admin/edit', {'id': id})
  }
}
