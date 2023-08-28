import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserSelectionModalComponent} from './user-selection-modal.component';

describe('UserSelectionModalComponent', () => {
    let component: UserSelectionModalComponent;
    let fixture: ComponentFixture<UserSelectionModalComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [UserSelectionModalComponent]
        });
        fixture = TestBed.createComponent(UserSelectionModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
