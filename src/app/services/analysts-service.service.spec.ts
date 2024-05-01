import { TestBed } from '@angular/core/testing';

import { AnalystsServiceService } from './analysts-service.service';

describe('AnalystsServiceService', () => {
  let service: AnalystsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalystsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
