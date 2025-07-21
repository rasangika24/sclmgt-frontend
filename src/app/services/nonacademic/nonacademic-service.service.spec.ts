import { TestBed } from '@angular/core/testing';

import { NonacademicServiceService } from './nonacademic-service.service';

describe('NonacademicServiceService', () => {
  let service: NonacademicServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonacademicServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
