import {Injectable} from "@angular/core";

import {LeaveRepository} from "../leave-repository/leave.repository";
import {ILeave} from "../leave-model/leave.model";

@Injectable({providedIn: 'root'})

export class LeaveService {

    constructor(private leaveRepository: LeaveRepository) {
    }

    public fetchAllLeaves(max: number, page: number) {
        return this.leaveRepository.fetchAllLeaves(max, page);
    }

    public fetchEmployeeLeaves(max: number, page: number, id: number) {
        return this.leaveRepository.fetchEmployeeLeaves(max, page, id);
    }

    public fetchLeavesUnderManager(max: number, page: number, id: any) {
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
