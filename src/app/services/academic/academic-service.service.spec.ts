import { TestBed } from '@angular/core/testing';

import { AcademicServiceService } from './academic-service.service';

describe('AcademicServiceService', () => {
  let service: AcademicServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
