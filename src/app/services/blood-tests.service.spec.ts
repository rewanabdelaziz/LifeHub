import { TestBed } from '@angular/core/testing';

import { BloodTestsService } from './blood-tests.service';

describe('BloodTestsService', () => {
  let service: BloodTestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloodTestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
