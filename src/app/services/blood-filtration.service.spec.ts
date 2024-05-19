import { TestBed } from '@angular/core/testing';

import { BloodFiltrationService } from './blood-filtration.service';

describe('BloodFiltrationService', () => {
  let service: BloodFiltrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloodFiltrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
