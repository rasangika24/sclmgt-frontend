import { TestBed } from '@angular/core/testing';

import { AddApplicantServiceService } from './add-applicant-service.service';

describe('AddApplicantServiceService', () => {
  let service: AddApplicantServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddApplicantServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
