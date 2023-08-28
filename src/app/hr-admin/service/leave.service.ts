import {Injectable} from "@angular/core";
import {LeaveRepository} from "../repository/leave.repository";

@Injectable({providedIn: 'root'})

export class LeaveService {

    constructor(private leaveRepository: LeaveRepository) {

    }

}
