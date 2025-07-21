import { TestBed } from '@angular/core/testing';

import { NonacademicStaffDetailsServiceService } from './nonacademic-staff-details.service.service';

describe('NonacademicStaffDetailsServiceService', () => {
  let service: NonacademicStaffDetailsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonacademicStaffDetailsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
