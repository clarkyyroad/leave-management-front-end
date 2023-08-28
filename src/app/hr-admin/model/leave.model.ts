import {Employee} from "../../model/employee.model";

export interface ILeave{
  id: number
  employee: Employee
  startDate:Date
  endDate: Date
  days: number
  reason: string
}
