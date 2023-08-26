import {Injectable} from "@angular/core";
import {EmployeeRepository} from "../repository/employee.repository";
import {Observable} from "rxjs";
import {IEmployeeList} from "../model/employee-list.model";

@Injectable({providedIn: 'root'})

export class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {
    }

    public getEmployeeList(): Observable<IEmployeeList[]> {
        return this.employeeRepository.getListEmployees();
    }
}