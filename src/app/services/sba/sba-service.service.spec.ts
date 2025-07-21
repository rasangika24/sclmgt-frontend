import { TestBed } from '@angular/core/testing';

import { SbaServiceService } from './sba-service.service';

describe('SbaServiceService', () => {
  let service: SbaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SbaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
