import {Injectable} from "@angular/core";

import {ILeave} from "../leave-model/leave.model";
import {LeaveRepository} from "../leave-repository/leave.repository";
@Injectable({providedIn: 'root'})

export class LeaveService {

    constructor(private leaveRepository: LeaveRepository) {
    }

    public fetchAllLeaves(max: number, page: number) {
        return this.leaveRepository.fetchAllLeaves(max, page);
    }

  public fetchEmployeeLeaves(max: number, page: number, employeeId: number){
    return this.leaveRepository.fetchEmployeeLeaves(max, page, employeeId);
  }

  public fetchLeavesUnderManager(max: number, page: number, managerId: number){
    return this.leaveRepository.fetchLeavesUnderManager(max, page, managerId);
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

    public cancelLeave(requestBody: ILeave) {
        return this.leaveRepository.cancelLeave(requestBody);
    }
}
