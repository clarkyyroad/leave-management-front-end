import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LeaveService} from "../../leave/leave-service/leave.service";
import {Router} from "@angular/router";
import {RouterService} from "../router-service/router.service";

@Component({
    selector: 'app-create-leave',
    templateUrl: './create-leave.component.html',
    styleUrls: ['./create-leave.component.css']
})
export class CreateLeaveComponent {
    public addLeaveForm: FormGroup;
    userId: number = 0;
    userRole: string = '';

    today = new Date().toISOString().split('T')[0];

    constructor(private leaveService: LeaveService, private routerService: RouterService, private router: Router) {
        const storedUserId = localStorage.getItem('userId');
        this.userId = storedUserId ? parseInt(storedUserId) : 0;
        const storedUserRole = localStorage.getItem('userRole');
        this.userRole = storedUserRole || 'Null';

        this.addLeaveForm = new FormGroup<any>({
            employee_id: new FormControl(this.userId),
            startDate: new FormControl(''),
            endDate: new FormControl(''),
            reason: new FormControl('')
        })
    }

    public back() {
        if (this.userRole === "MANAGER") {
            this.routerService.navigate('/manager/')
                .then(() => console.log('Navigation successful'))
                .catch((error) => console.log('Navigation error: ', error));
        } else if (this.userRole === "MEMBER") {
            this.routerService.navigate('/member/')
                .then(() => console.log('Navigation successful'))
                .catch((error) => console.log('Navigation error: ', error));
        }
    }

    public addLeave() {
        const formValue: any = this.addLeaveForm.getRawValue();
        console.warn(formValue);
        this.leaveService.saveLeave(formValue).subscribe({
            next: (data: any) => {
                if (this.userRole === "MANAGER") {
                    this.routerService.navigate('/manager/my-leaves').then(() => console.log('Navigation Successful')).catch((error) => console.error('Navigation error:', error))
                } else if (this.userRole === "MEMBER") {
                    this.routerService.navigate('/member/my-leaves').then(() => console.log('Navigation Successful')).catch((error) => console.error('Navigation error:', error))
                }
            }, error: (error) => {
                console.error('Error creating', error);
            }
        });
    }
}
