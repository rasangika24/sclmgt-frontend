import { TestBed } from '@angular/core/testing';

import { LeavingServiceService } from './leaving-service.service';

describe('LeavingServiceService', () => {
  let service: LeavingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeavingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
