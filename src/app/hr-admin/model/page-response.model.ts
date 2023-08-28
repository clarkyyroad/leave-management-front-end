import {IEmployee} from "./employee.model";

export interface IPageResponse {
    totalNumber: number
    pageNumber: number
    content: IEmployee[]
}
