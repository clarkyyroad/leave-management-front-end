import {Injectable} from "@angular/core";
import {LandingPageRepository} from "../repository/landing-page.repository";
import {Observable} from "rxjs";
import {IUsers} from "../../hr-admin/model/employee-list.model";

@Injectable({providedIn: 'root'})

export class LandingPageService {
    constructor(private landingPageRepository: LandingPageRepository) {
    }

    public getUser(): Observable<IUsers[]> {
        return this.landingPageRepository.getUser();
    }
}