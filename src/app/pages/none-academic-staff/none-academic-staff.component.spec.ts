import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoneAcademicStaffComponent } from './none-academic-staff.component';

describe('NoneAcademicStaffComponent', () => {
  let component: NoneAcademicStaffComponent;
  let fixture: ComponentFixture<NoneAcademicStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoneAcademicStaffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoneAcademicStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
