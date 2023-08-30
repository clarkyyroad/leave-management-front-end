import {IEmployee} from "./employee.model";

export interface IEmployeePageResponse {
    totalNumber: number
    pageNumber: number
    content: IEmployee[]
}
