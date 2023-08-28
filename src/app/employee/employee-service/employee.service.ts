import {Injectable} from "@angular/core";
import {EmployeeRepository} from "../employee-repository/employee.repository";
import {Observable} from "rxjs";
import {IUsers} from "../employee-model/employee-list.model";
import {IEmployee} from "../employee-model/employee.model";

@Injectable({providedIn: 'root'})

export class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {
    }

    public getEmployeeList(): Observable<IUsers[]> {
        return this.employeeRepository.getListEmployees();
    }

  public saveEmployee(requestBody: IEmployee) {
    return this.employeeRepository.createMember(requestBody)
    }
}
