import { TestBed } from '@angular/core/testing';

import { ClassGradeGenerateService } from './class-grade-generate.service';

describe('ClassGradeGenerateService', () => {
  let service: ClassGradeGenerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassGradeGenerateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
