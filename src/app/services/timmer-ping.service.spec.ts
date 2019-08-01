import { TestBed } from '@angular/core/testing';

import { TimmerPingService } from './timmer-ping.service';

describe('TimmerPingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimmerPingService = TestBed.get(TimmerPingService);
    expect(service).toBeTruthy();
  });
});
