import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../employee-service/employee.service";
import {Router} from "@angular/router";
import {IEmployee} from "../../employee-model/employee.model";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  public addEmployeeForm: FormGroup;

  constructor(private employeeService: EmployeeService, private router: Router) {
    this.addEmployeeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      manager: new FormControl(''),
      annualLeave: new FormControl(''),
      role: new FormControl('')
    })
  }

  public onSubmit() {

    const formValue: IEmployee = this.addEmployeeForm.getRawValue();

    this.employeeService.saveEmployee(formValue)
      .subscribe({
        next: () => {
          this.router.navigate(['/hr-admin'])
        }
      });
  }
}
