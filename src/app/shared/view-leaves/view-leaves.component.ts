import {Component} from '@angular/core';
import {LeaveResponse} from "../../hr-admin/model/leave-list.model";
import {RouterService} from "../../service/router.service";
import {LeaveService} from "../../hr-admin/service/leave.service";

@Component({
    selector: 'app-view-leaves',
    templateUrl: './view-leaves.component.html',
    styleUrls: ['./view-leaves.component.css']
})
export class ViewLeavesComponent {

    public leavesInPage: LeaveResponse = {
        content: [],
        pageNumber: 0,
        totalCount: 0
    }
    public readonly MAX_LIMIT: number = 5;
    private page: number = 1;

    constructor(private leaveService: LeaveService, private routerService: RouterService) {
    }
}
