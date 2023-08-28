import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

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
}
