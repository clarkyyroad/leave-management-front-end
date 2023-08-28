import {Injectable} from "@angular/core";
import {LeaveRepository} from "../repository/leave.repository";
import {ILeave} from "../model/leave.model";

@Injectable({providedIn: 'root'})

export class LeaveService {

  constructor(private leaveRepository: LeaveRepository) {
  }

  public fetchAllLeaves(max: number, page: number){
    return this.leaveRepository.fetchAllLeaves(max, page);
  }

  public fetchEmployeeLeaves(max: number, page: number){
    return this.leaveRepository.fetchEmployeeLeaves(max, page);
  }

  public fetchLeavesUnderManager(max: number, page: number){
    return this.leaveRepository.fetchLeavesUnderManager(max, page);
  }

  public saveLeave(requestBody: ILeave){
    return this.leaveRepository.createLeave(requestBody);
  }

  public approveLeave(requestBody: ILeave){
    return this.leaveRepository.approveLeave(requestBody);
  }

  public rejectLeave(requestBody: ILeave){
    return this.leaveRepository.rejectLeave(requestBody);
  }

  public cancelLeave(requestBody: ILeave){
    return this.leaveRepository.cancelLeave(requestBody);
  }
}
