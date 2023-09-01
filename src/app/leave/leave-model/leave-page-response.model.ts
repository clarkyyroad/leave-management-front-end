import {ILeave} from "./leave.model";

export interface LeavePageResponseModel {
    totalCount: number,
    pageNumber: number,
    content: ILeave[]
}
