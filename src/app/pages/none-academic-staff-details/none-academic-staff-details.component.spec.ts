import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoneAcademicStaffDetailsComponent } from './none-academic-staff-details.component';

describe('NoneAcademicStaffDetailsComponent', () => {
  let component: NoneAcademicStaffDetailsComponent;
  let fixture: ComponentFixture<NoneAcademicStaffDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoneAcademicStaffDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoneAcademicStaffDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
