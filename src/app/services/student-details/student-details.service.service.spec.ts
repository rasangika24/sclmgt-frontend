import { TestBed } from '@angular/core/testing';

import { StudentDetailsServiceService } from './student-details.service.service';

describe('StudentDetailsServiceService', () => {
  let service: StudentDetailsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentDetailsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
