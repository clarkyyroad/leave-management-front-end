import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../employee-service/employee.service";
import {IEmployee} from "../../employee-model/employee.model";
import {FormControl, FormGroup} from "@angular/forms";
import {IUsers} from "../../employee-model/employee-list.model";
import {RouterService} from "../../../shared/router-service/router.service";

@Component({
    selector: 'app-add-employee',
    templateUrl: './add-employee.component.html',
    styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

    public addEmployeeForm: FormGroup;
    public managers: IUsers[] = [];
    public userId: number;
    public errorMessage: string = '';
    public errorCode: string = '';
    public showModal: boolean = false;

    constructor(private employeeService: EmployeeService, private routerService: RouterService) {
        const storedUserId = localStorage.getItem('userId');
        this.userId = storedUserId ? parseInt(storedUserId) : 0;
        this.addEmployeeForm = new FormGroup({
            name: new FormControl(''),
            managerId: new FormControl(),
            totalLeaves: new FormControl(''),
            roleType: new FormControl('')
        })
    }

    ngOnInit() {
        const initialRoleType = this.addEmployeeForm.get('roleType')?.value;
        this.initializeManager(initialRoleType);
    }

    public onSubmit() {
        console.warn(this.addEmployeeForm.getRawValue());
        const formValue = this.addEmployeeForm.getRawValue();
        this.employeeService.createEmployee(this.userId, formValue).subscribe({
            next: (data: IEmployee) => {
                console.log('Successfully Created', data);
                this.routerService.navigate('/hr-admin/').then(() => console.log('Navigated successful'))
                    .catch((error) => console.error('Navigation error: ', error));
            },
            error: (error) => {
                console.error('Error Creating Employee', error);
                this.errorCode = error.error.errorCode;
                this.errorMessage = error.error.errorMessage;
                this.showModal = true;
                console.log(this.errorMessage);
            }
        });
    }

    goBack() {
        this.routerService.navigate('/hr-admin/').then(() => console.log('Navigate successful'))
            .catch((error) => console.error('Navigation error:', error));
    }

    onRoleTypeChange() {
        const roleType = this.addEmployeeForm.get('roleType')?.value;
        this.initializeManager(roleType)
    }

    onCloseModal() {
        this.showModal = false;
    }

    private initializeManager(roleType: string) {
        this.employeeService.getUsers(roleType).subscribe({
            next: (data: IUsers[]) => {
                this.managers = data;
            }
        })
    }
}
