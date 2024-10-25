import { TestBed } from '@angular/core/testing';

import { ScorecardDataServiceTsService } from './scorecard-data.service.ts.service';

describe('ScorecardDataServiceTsService', () => {
  let service: ScorecardDataServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScorecardDataServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
