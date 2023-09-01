import {IEmployee} from "./employee.model";

export interface IEmployeePageResponse {
    totalCount: number
    pageNumber: number
    content: IEmployee[]
}
