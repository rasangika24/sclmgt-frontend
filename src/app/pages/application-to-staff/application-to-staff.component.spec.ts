import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationToStaffComponent } from './application-to-staff.component';

describe('ApplicationToStaffComponent', () => {
  let component: ApplicationToStaffComponent;
  let fixture: ComponentFixture<ApplicationToStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationToStaffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationToStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
