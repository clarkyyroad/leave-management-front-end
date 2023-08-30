import {Injectable} from "@angular/core";
import {EmployeeRepository} from "../employee-repository/employee.repository";
import {Observable} from "rxjs";
import {IUsers} from "../employee-model/employee-list.model";
import {IEmployee} from "../employee-model/employee.model";
import {IEmployeePageResponse} from "../employee-model/employee-page-response.model";

@Injectable({providedIn: 'root'})

export class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {
    }

    public getUsers(roleType: string): Observable<IUsers[]> {
        return this.employeeRepository.getListEmployees(roleType);
    }

    public getEmployees(max: number, page: number): Observable<IEmployeePageResponse> {
        return this.employeeRepository.getPagedEmployees(max, page);
    }


    public getEmployee(id: number): Observable<IEmployee>{
      return this.employeeRepository.getEmployeeById(id);

    }
  public createMember(requestParam: number, requestBody: IEmployee) {
    return this.employeeRepository.createMemberEmployee(requestParam, requestBody)
    }
}
