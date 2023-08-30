import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ILeave} from "../leave-model/leave.model";
import {LeavePageResponseModel} from "../leave-model/leave-page-response.model";
import {LeaveResponse} from "../leave-model/leave-response.model";

@Injectable({providedIn: 'root'})
export class LeaveRepository {

    private readonly baseUrl = 'api/v1';
    private readonly CONTENT_TYPE = 'application/json';
    private readonly headers: HttpHeaders;

    constructor(private httpClient: HttpClient) {
        this.headers = new HttpHeaders({
            'Content-Type': this.CONTENT_TYPE
        });
    }

  public fetchAllLeaves(max: number, page: any): Observable<any>{
    const getAllLeavesUrls: string = this.baseUrl + '/leave/hr? max=' + max + '&page=' + page;
    return this.httpClient.get<any>(getAllLeavesUrls, {headers: this.headers});
  }

  public fetchEmployeeLeaves(max: number, page: number, id: any): Observable<LeaveResponse>{
    const getEmployeeLeavesUrl: string = this.baseUrl + '/leave?max=' + max + '&page=' + page + '&employeeId=' + id;
    return this.httpClient.get<LeaveResponse>(getEmployeeLeavesUrl, {headers: this.headers});
  }

  public fetchLeavesUnderManager(max: number, page: number, id: any): Observable<any>{
    const getLeavesUnderManagerUrl: string = this.baseUrl + '/leave/manager?max=' + max + '&page=' + page + '&employeeId=' + id;
    return this.httpClient.get<any>(getLeavesUnderManagerUrl, {headers: this.headers});
  }

  public createLeave(requestBody: ILeave){
    const createLeaveUrl: string = this.baseUrl + '/leave';
    return this.httpClient.post<any>(createLeaveUrl, requestBody, {headers: this.headers});
  }

  public approveLeave(leaveId: number){
    const approveLeaveUrl: string = this.baseUrl + '/leave/approve/' + leaveId;
    return this.httpClient.put<any>(approveLeaveUrl, {headers: this.headers});
  }

  public rejectLeave(leaveId: number){
    const rejectLeaveUrl: string = this.baseUrl + '/leave/reject/' + leaveId;
    return this.httpClient.put<any>(rejectLeaveUrl, {headers: this.headers});
  }

  public cancelLeave(id: number){
    const cancelLeaveUrl: string = this.baseUrl + '/leave/' + id;
    return this.httpClient.delete<any>(cancelLeaveUrl,{headers: this.headers});
  }
}
