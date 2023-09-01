import {Component, OnInit} from '@angular/core';
import {RouterService} from "../../../shared/router-service/router.service";
import {LeaveService} from "../../../leave/leave-service/leave.service";
import {LeavePageResponseModel} from "../../../leave/leave-model/leave-page-response.model";
import {ILeave} from "../../../leave/leave-model/leave.model";

@Component({
  selector: 'app-approve-reject-leave',
  templateUrl: './approve-reject-leave.component.html',
  styleUrls: ['./approve-reject-leave.component.css']
})

export class ApproveRejectLeaveComponent implements OnInit {

  public leavesInPage: LeavePageResponseModel = {
    totalCount: 0,
    pageNumber: 0,
    content: []
  }
  userName: string = '';
  currentPage: number = 1;
  totalPages!: number;
  private readonly MAX_LIMIT: number = 5;

  constructor(private routerService: RouterService, private leaveService: LeaveService) {
    const storedUserName = localStorage.getItem('userName');
    this.userName = storedUserName || 'Unknown User';
  }

  ngOnInit() {
    this.initializeLeaves();
  }

  logout() {
    sessionStorage.clear()
    this.routerService.navigate('/landing/').then(() => console.log('Navigation successful'))
      .catch((error) => console.error('Navigation error: ', error))
  }

  approveLeave(leaveId: any) {
    this.leaveService.approveLeave(leaveId).subscribe({
      next: (data: ILeave) => {
        console.log('Response ', data);
        this.initializeLeaves();
      }
    });
  }

  rejectLeave(leaveID: number) {
    this.leaveService.rejectLeave(leaveID).subscribe({
      next: (data: ILeave) => {
        console.log('Response ', data);
        this.initializeLeaves();
      }
    });
  }

  viewAllEmployee() {
    this.routerService.navigate('/hr-admin/').then(() => console.log('Navigation successful'))
      .catch((error) => console.error('Navigation error: ', error));
  }

  viewAllLeaves() {
    this.routerService.navigate('hr-admin/leaves').then(() => console.log('Navigation successful'))
      .catch((error) => console.error('Navigation error: ', error));
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.initializeLeaves();
      console.log(this.currentPage);
    }
  }

  private initializeLeaves() {
    this.leaveService.fetchAllLeaves(this.MAX_LIMIT, this.currentPage).subscribe({
      next: (data: LeavePageResponseModel) => {
        console.log('Response: ', data);
        this.leavesInPage.content = data.content;
        this.leavesInPage.pageNumber = data.pageNumber;
        this.leavesInPage.totalCount = data.totalCount;
        this.totalPages = Math.ceil(data.totalCount / this.MAX_LIMIT);
      }
    });
  }
}
