import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {IUsers} from "../employee-model/employee-list.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IEmployee} from "../employee-model/employee.model";

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

  public createMember(requestBody: IEmployee) {
    const createMemberUrl = this.baseUrl + '/employees/member';
    return this.httpClient.post<any>(createMemberUrl, requestBody, {headers: this.headers})
    }
}