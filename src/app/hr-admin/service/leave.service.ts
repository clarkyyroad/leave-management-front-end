import {Injectable} from "@angular/core";
import {LeaveRepository} from "../repository/leave.repository";

@Injectable({providedIn: 'root'})

export class LeaveService{

  constructor(private leaveRepository: LeaveRepository) {
  }

  public getAllLeaves(max: number, page: number){
    return this.leaveRepository.fetchAllLeaves(max, page);
  }

  public getEmployeeLeaves(max: number, page: number){
    return this.leaveRepository.fetchEmployeeLeaves(max, page);
  }

  public getLeavesUnderManager(max: number, page: number){
    return this.leaveRepository.fetchLeavesUnderManager(max, page);
  }

}
