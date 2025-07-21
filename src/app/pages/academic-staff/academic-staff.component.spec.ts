import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicStaffComponent } from './academic-staff.component';

describe('AcademicStaffComponent', () => {
  let component: AcademicStaffComponent;
  let fixture: ComponentFixture<AcademicStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicStaffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcademicStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
