import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {IUsers} from "../employee-model/employee-list.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IEmployee} from "../employee-model/employee.model";
import {IPageResponse} from "../employee-model/page-response.model";

@Injectable({providedIn: 'root'})
export class EmployeeRepository {

    private readonly baseUrl = 'api/v1';
    private readonly CONTENT_TYPE = 'application/json';
    private readonly headers: HttpHeaders;

    constructor(private httpClient: HttpClient) {
        this.headers = new HttpHeaders({
            'Content-Type': this.CONTENT_TYPE
        });
    }

    public getListEmployees(): Observable<IUsers[]> {
        const getListEmployeeUrl: string = this.baseUrl + '/employees/list';
        return this.httpClient.get<IUsers[]>(getListEmployeeUrl, {headers: this.headers});
    }

    public getPagedEmployees(max: number, page: number): Observable<IPageResponse> {
        const getPageEmployeesUrl: string = this.baseUrl + `/employees?max=${max}&page${page}`;
        return this.httpClient.get<IPageResponse>(getPageEmployeesUrl, {headers: this.headers});
    }

    public createMemberEmployee(requestParam: number, requestBody: IEmployee): Observable<IEmployee> {
        const createMemberUrl: string = this.baseUrl + `/employees/member?adminId=${requestParam}`;
        return this.httpClient.post<IEmployee>(createMemberUrl, requestBody, {headers: this.headers})
    }
}
