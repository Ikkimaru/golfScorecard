import { TestBed } from '@angular/core/testing';

import { ScorecardDataService } from './scorecard-data.service';

describe('ScorecardDataService', () => {
  let service: ScorecardDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScorecardDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
