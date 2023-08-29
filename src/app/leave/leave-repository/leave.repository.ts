import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ILeave} from "../leave-model/leave.model";

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

  public fetchAllLeaves(max: number, page: number): Observable<any>{
    const getAllLeavesUrls: string = this.baseUrl + '/leave/hr? max=' + max + '&page=' + page;
    return this.httpClient.get<any>(getAllLeavesUrls, {headers: this.headers});
  }

  public fetchEmployeeLeaves(max: number, page: number, employeeId: number): Observable<any>{
    const getEmployeeLeavesUrl: string = this.baseUrl + 'leave?max=' + max + '&page=' + page + '&employeeId=' + employeeId;
    return this.httpClient.get<any>(getEmployeeLeavesUrl, {headers: this.headers});
  }

  public fetchLeavesUnderManager(max: number, page: number, managerId: number): Observable<any>{
    const getLeavesUnderManagerUrl: string = this.baseUrl + '/leave/manager?max=' + max + '&page=' + page + '&managerId=' + managerId;
    return this.httpClient.get<any>(getLeavesUnderManagerUrl, {headers: this.headers});
  }

  public createLeave(requestBody: ILeave){
    const createLeaveUrl: string = this.baseUrl + '/leave';
    return this.httpClient.post<any>(createLeaveUrl, requestBody, {headers: this.headers});
  }

  public approveLeave(requestBody: ILeave){
    const approveLeaveUrl: string = this.baseUrl + '/leave/approve/' + requestBody.id;
    return this.httpClient.put<any>(approveLeaveUrl, requestBody, {headers: this.headers});
  }

  public rejectLeave(requestBody: ILeave){
    const rejectLeaveUrl: string = this.baseUrl + '/leave/reject/' + requestBody.id;
    return this.httpClient.put<any>(rejectLeaveUrl, requestBody, {headers: this.headers});
  }

  public cancelLeave(requestBody: ILeave){
    const cancelLeaveUrl: string = this.baseUrl + '/leave/' + requestBody.id;
    return this.httpClient.put<any>(cancelLeaveUrl, requestBody, {headers: this.headers});
  }
}
