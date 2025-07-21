import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicStaffDetailsComponent } from './academic-staff-details.component';

describe('AcademicStaffDetailsComponent', () => {
  let component: AcademicStaffDetailsComponent;
  let fixture: ComponentFixture<AcademicStaffDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicStaffDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcademicStaffDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
