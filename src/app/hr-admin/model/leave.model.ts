import {Employee} from "../../model/employee.model";

export interface ILeave{
  employee: Employee
  startDate:Date
  endDate: Date
  days: number
  reason: string
}
