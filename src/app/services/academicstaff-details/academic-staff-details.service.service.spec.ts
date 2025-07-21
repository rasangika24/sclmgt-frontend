import { TestBed } from '@angular/core/testing';

import { AcademicStaffDetailsServiceService } from './academic-staff-details.service.service';

describe('AcademicStaffDetailsServiceService', () => {
  let service: AcademicStaffDetailsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicStaffDetailsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
