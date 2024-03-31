import { TestBed } from '@angular/core/testing';

import { DonationRegesisterService } from './donation-regesister.service';

describe('DonationRegesisterService', () => {
  let service: DonationRegesisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonationRegesisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
