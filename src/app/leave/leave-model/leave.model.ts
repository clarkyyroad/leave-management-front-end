import {IEmployee} from "../../employee/employee-model/employee.model";

export interface ILeave{
  id: number
  employee: IEmployee
  startDate:Date
  endDate: Date
  days: number
  reason: string
  leaveStatus: string
}
