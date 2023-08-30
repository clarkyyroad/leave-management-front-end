import {ILeave} from "./leave.model";

export interface LeavePageResponseModel {
    totalNumber: number,
    pageNumber: number,
    content: ILeave[]
}