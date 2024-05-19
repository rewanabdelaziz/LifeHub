import { TestBed } from '@angular/core/testing';

import { WashedRBCSService } from './washed-rbcs.service';

describe('WashedRBCSService', () => {
  let service: WashedRBCSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WashedRBCSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
