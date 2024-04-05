import { TestBed } from '@angular/core/testing';

import { RequestDonorService } from './request-donor.service';

describe('RequestDonorService', () => {
  let service: RequestDonorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestDonorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
