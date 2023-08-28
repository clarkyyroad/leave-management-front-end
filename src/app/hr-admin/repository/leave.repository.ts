import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ILeave} from "../model/leave.model";

@Injectable({providedIn: 'root'})
export class LeaveRepository{
  private readonly baseUrl = 'api/v1';
  private readonly CONTENT_TYPE = 'application/json';
  private readonly headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': this.CONTENT_TYPE
    });
  }

  public fetchAllLeaves(max: number, page: number): Observable<any>{
    const getAllLeavesUrls: string = 'api/v1/leave/hr? max=' + max + '&page=' + page;
    return this.httpClient.get<any>(getAllLeavesUrls, {headers: this.headers});
  }

  public fetchEmployeeLeaves(max: number, page: number): Observable<any>{
    const getEmployeeLeavesUrl: string = 'api/v1/leave?max=' + max + '&page=' + page;
    return this.httpClient.get<any>(getEmployeeLeavesUrl, {headers: this.headers});
  }

  public fetchLeavesUnderManager(max: number, page: number): Observable<any>{
    const getLeavesUnderManagerUrl: string = 'api/v1/leave/manager?max=' + max + '&page=' + page;
    return this.httpClient.get<any>(getLeavesUnderManagerUrl, {headers: this.headers});
  }

  public createLeave(requestBody: ILeave){
    const createLeaveUrl: string = 'api/v1/leave';
    return this.httpClient.post<any>(createLeaveUrl, requestBody, {headers: this.headers});
  }

  public approveLeave(requestBody: ILeave){
    const approveLeaveUrl: string = 'api/v1/leave/approve/' + requestBody.id;
    return this.httpClient.put<any>(approveLeaveUrl, requestBody, {headers: this.headers});
  }

  public rejectLeave(requestBody: ILeave){
    const rejectLeaveUrl: string = 'api/v1/leave/reject/' + requestBody.id;
    return this.httpClient.put<any>(rejectLeaveUrl, requestBody, {headers: this.headers});
  }

  public cancelLeave(requestBody: ILeave){
    const cancelLeaveUrl: string = 'api/v1/leave/' + requestBody.id;
    return this.httpClient.put<any>(cancelLeaveUrl, requestBody, {headers: this.headers});
  }
}
