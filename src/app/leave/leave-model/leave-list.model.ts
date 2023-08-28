import {ILeave} from "./leave.model";

export interface LeaveResponse {

  totalCount: number
  pageNumber: number
  content: ILeave[]

}
