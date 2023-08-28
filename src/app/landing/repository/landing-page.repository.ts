import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUsers} from "../../hr-admin/model/employee-list.model";

@Injectable({providedIn: 'root'})
export class LandingPageRepository {

    private readonly baseUrl: string = 'api/v1';
    private readonly CONTENT_TYPE: string = 'application/json';
    private readonly headers: HttpHeaders;

    constructor(private httpClient: HttpClient) {
        this.headers = new HttpHeaders({'Content-Type': this.CONTENT_TYPE});
    }

    public getUser(): Observable<IUsers[]> {
        const getUserUrl: string = this.baseUrl + '/employees/list';
        return this.httpClient.get<IUsers[]>(getUserUrl, {headers: this.headers});
    }
}