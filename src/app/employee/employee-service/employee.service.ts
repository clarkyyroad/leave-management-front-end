import {Injectable} from "@angular/core";
import {EmployeeRepository} from "../employee-repository/employee.repository";
import {Observable} from "rxjs";
import {IUsers} from "../employee-model/employee-list.model";
import {IEmployee} from "../employee-model/employee.model";
import {IPageResponse} from "../employee-model/page-response.model";

@Injectable({providedIn: 'root'})

export class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {
    }

    public getUsers(): Observable<IEmployee[]> {
        return this.employeeRepository.getListEmployees();
    }

    public getEmployees(max: number, page: number): Observable<IPageResponse> {
        return this.employeeRepository.getPagedEmployees(max, page);
    }

    public getEmployee(id: number): Observable<IEmployee>{
      return this.employeeRepository.getEmployeeById(id);

    }
  public createMember(requestParam: number, requestBody: IEmployee) {
    return this.employeeRepository.createMemberEmployee(requestParam, requestBody)
    }
}
