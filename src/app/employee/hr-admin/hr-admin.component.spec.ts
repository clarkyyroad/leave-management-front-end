import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HrAdminComponent} from './hr-admin.component';

describe('HrAdminComponent', () => {
  let component: HrAdminComponent;
  let fixture: ComponentFixture<HrAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HrAdminComponent]
    });
    fixture = TestBed.createComponent(HrAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
