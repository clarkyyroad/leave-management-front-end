import {Injectable} from "@angular/core";

import {ILeave} from "../leave-model/leave.model";
import {Observable} from "rxjs";
import {LeavePageResponseModel} from "../leave-model/leave-page-response.model";
import {LeaveRepository} from "../leave-repository/leave.repository";


@Injectable({providedIn: 'root'})

export class LeaveService {

  constructor(private leaveRepository: LeaveRepository) {
  }

  public fetchAllLeaves(max: number, page: number) {
    return this.leaveRepository.fetchAllLeaves(max, page);
  }

  public fetchEmployeeLeaves(max: number, page: number, id: number): Observable<LeavePageResponseModel> {
    return this.leaveRepository.fetchEmployeeLeaves(max, page, id);
  }

  public fetchLeavesUnderManager(max: number, page: number, id: number) {
    return this.leaveRepository.fetchLeavesUnderManager(max, page, id);
  }

  public saveLeave(requestBody: ILeave) {
    return this.leaveRepository.createLeave(requestBody);
  }

  public approveLeave(employeeId: number) {
    return this.leaveRepository.approveLeave(employeeId);
  }

  public rejectLeave(leaveID: number) {
    return this.leaveRepository.rejectLeave(leaveID);
  }

  public cancelLeave(leaveId: number) {
    return this.leaveRepository.cancelLeave(leaveId);
  }

}
